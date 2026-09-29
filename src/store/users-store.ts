// src/store/users-store.ts

import { create } from "zustand";
import { produce } from "immer";
import { ResultObject, User, UserCredentials, UserSortKey, USER_ROLES } from "../types/default-type";
import {
  collection,
  deleteField,
  deleteDoc,
  documentId,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  startAfter,
  setDoc,
  Timestamp,
  endBefore,
  limitToLast,
  writeBatch,
} from "firebase/firestore";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword as updateAuthPassword,
} from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../db/firebase";

const INITIAL_ADMIN_EMAIL = "ssorabh.ssharma@gmail.com";

// Define the store interface
interface IStore {
  currentUser: User | null;
  users: User[] | null;
  firstUser: User | null;
  lastUser: User | null;

  // New pagination flags:
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  createUser: (user: UserCredentials) => Promise<ResultObject>;
  getUserById: (userId: string) => Promise<ResultObject>;
  updateUserById: (
    userId: string,
    userData: Omit<Partial<User>, "password">,
    password?: string,
    currentEmail?: string
  ) => Promise<ResultObject>;
  updateCurrentUserProfile: (userId: string, profile: Pick<User, "name" | "phone" | "address">) => Promise<ResultObject>;
  changeCurrentUserPassword: (currentPassword: string, newPassword: string) => Promise<ResultObject>;
  deleteUserById: (userId: string) => Promise<ResultObject>;
  signup: (user: UserCredentials) => Promise<ResultObject>;
  login: (email: string, password: string) => Promise<ResultObject>;
  sendPasswordReset: (email: string) => Promise<ResultObject>;
  logout: () => void;
  getTotalUsers: () => Promise<number>;
  loadUsersForSearch: () => Promise<ResultObject>;
  removeStoredUserPasswords: () => Promise<ResultObject>;
  fetchAllUsers: (
    pageSize: number,
    lastUser?: User | null,
    firstUser?: User | null,
    direction?: "next" | "prev",
    sortKey?: UserSortKey,
    sortOrder?: OrderByDirection
  ) => Promise<ResultObject>;
}

export function sanitizeUserProfile(data: Record<string, unknown>): User {
  const profile = { ...data };
  delete profile.password;
  return profile as unknown as User;
}

function getStoredCurrentUser(): User | null {
  const storedUser = localStorage.getItem("currentUser");
  if (!storedUser) return null;
  try {
    const parsedUser = JSON.parse(storedUser) as Record<string, unknown> | null;
    if (!parsedUser) {
      localStorage.removeItem("currentUser");
      return null;
    }
    const profile = sanitizeUserProfile(parsedUser);
    localStorage.setItem("currentUser", JSON.stringify(profile));
    return profile;
  } catch {
    localStorage.removeItem("currentUser");
    return null;
  }
}

// Create Zustand store manually applying Immer
const useUserStore = create<IStore>((set, get) => ({
  currentUser: getStoredCurrentUser(),
  users: null,
  isLoading: false,
  firstUser: null,
  lastUser: null,

  // initialize pagination flags:
  hasPreviousPage: true,
  hasNextPage: false,

  createUser: async (user) => {
    try {
  
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        user.email, 
        user.password
      );
      const uid = userCredential.user.uid;
  
      // Store user data in Firestore (without password)
      const userRef = doc(db, "users", uid);
      const userProfile = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        ...(user.create_date ? { create_date: user.create_date } : {}),
        ...(user.last_login ? { last_login: user.last_login } : {}),
      };
      await setDoc(userRef, userProfile);
  
      return { success: true };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, error: (error as Error).message };
    }
  },
  getUserById: async (userId) => {
    try {
      const userSnapshot = await getDoc(doc(db, "users", userId));
      if (!userSnapshot.exists()) {
        return { success: false, error: "User not found." };
      }
      return {
        success: true,
        data: { ...sanitizeUserProfile(userSnapshot.data()), id: userSnapshot.id },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Could not load user.",
      };
    }
  },
  updateUserById: async (userId, userData, password, currentEmail) => {
    let credentialsUpdated = false;
    try {
      if (password || (currentEmail && userData.email && currentEmail !== userData.email)) {
        const updatePassword = httpsCallable<
          { userId: string; email: string; password?: string },
          { success: boolean }
        >(functions, "updateUserPassword");
        await updatePassword({ userId, email: userData.email ?? currentEmail ?? "", password });
        credentialsUpdated = true;
      }

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { ...userData, password: deleteField() }, { merge: true });
      set((state) => {
        if (state.currentUser?.id !== userId) return state;
        const currentUser = { ...state.currentUser, ...userData };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        return { ...state, currentUser };
      });

      return { success: true };
    } catch (error) {
      const callableError = error as { code?: string; message?: string };
      const code = callableError.code ?? "";
      const rawMessage = callableError.message ?? "Unknown error";
      const isGenericInternalError = code === "functions/internal"
        && (!rawMessage || rawMessage.toLowerCase() === "internal" || rawMessage.toLowerCase().includes("internal error"));
      const message = isGenericInternalError
        ? "The deployed password function returned a generic internal error. Deploy the latest updateUserPassword function, then check its logs for the failed request."
        : code === "functions/not-found"
          ? rawMessage || "No matching Firebase Authentication account was found for this user."
          : code === "functions/permission-denied"
            ? "Only an administrator can change another user's password."
            : rawMessage;
      console.error("Error updating user:", message);
      return {
        success: false,
        error: credentialsUpdated
          ? `Firebase Authentication was updated, but the user profile could not be saved: ${message}`
          : message,
      };
    }
  },

  updateCurrentUserProfile: async (userId, profile) => {
    try {
      await setDoc(doc(db, "users", userId), { ...profile, password: deleteField() }, { merge: true });
      set((state) => {
        if (!state.currentUser || state.currentUser.id !== userId) return state;
        const currentUser = { ...state.currentUser, ...profile };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        return { ...state, currentUser };
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Could not save profile." };
    }
  },

  changeCurrentUserPassword: async (currentPassword, newPassword) => {
    const currentAuthUser = auth.currentUser;
    if (!currentAuthUser?.email) {
      return { success: false, error: "Sign in again before changing your password." };
    }

    try {
      const credential = EmailAuthProvider.credential(currentAuthUser.email, currentPassword);
      await reauthenticateWithCredential(currentAuthUser, credential);
      await updateAuthPassword(currentAuthUser, newPassword);
      return { success: true };
    } catch (error) {
      const firebaseError = error as { code?: string; message?: string };
      const message = firebaseError.code === "auth/invalid-credential"
        ? "The current password is incorrect."
        : firebaseError.code === "auth/requires-recent-login"
          ? "Please sign in again, then retry the password change."
          : firebaseError.message ?? "Could not change password.";
      return { success: false, error: message };
    }
  },

  deleteUserById: async (userId: string) => {
    try {

      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);

      set(
        produce((state: IStore) => {
          if (state.users) {
            state.users = state.users.filter((user) => user.id !== userId);
          }
        })
      );

      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error deleting user:", message);
      return { success: false, error: message };
    }
  },

  signup: async (user) => {
    const {createUser} = get();
    return createUser(user);
  },

  login: async (email: string, password: string) => {
    try {
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const authUser = userCredential.user;
      const uid = authUser.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      const isInitialAdmin = authUser.emailVerified
        && authUser.email?.toLocaleLowerCase() === INITIAL_ADMIN_EMAIL;
      let userProfile: User;
      if (userDoc.exists()) {
        userProfile = sanitizeUserProfile(userDoc.data());
        if (isInitialAdmin && userProfile.role !== USER_ROLES.ADMIN) {
          userProfile = { ...userProfile, role: USER_ROLES.ADMIN };
          await setDoc(doc(db, "users", uid), userProfile, { merge: true });
        }
      } else {
        const profileEmail = authUser.email ?? email;
        userProfile = {
          name: authUser.displayName || profileEmail.split("@")[0] || "Member",
          email: profileEmail,
          phone: "",
          address: "",
          role: isInitialAdmin ? USER_ROLES.ADMIN : USER_ROLES.SUBSCRIBER,
          create_date: Timestamp.now(),
          last_login: Timestamp.now(),
        };

        try {
          await setDoc(doc(db, "users", uid), userProfile);
        } catch (profileError) {
          await auth.signOut();
          const firestoreError = profileError as { code?: string; message?: string };
          const message = firestoreError.code === "permission-denied"
            ? "Your Firebase account is valid, but Firestore rules blocked profile setup. Deploy the current Firestore rules or ask an administrator to create your profile."
            : firestoreError.message ?? "Could not create your user profile.";
          return { success: false, error: message };
        }
      }

      const userData = { ...userProfile, id: uid };
      set((state) => ({ ...state, currentUser: userData }));
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true };
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      const message = typeof firebaseError.code === 'string'
        ? firebaseError.code.replace("auth/", "").replace(/-/g, " ")
        : firebaseError.message ?? "Unknown error";
      return { success: false, error: message };
    }
  },

  sendPasswordReset: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      const message = typeof firebaseError.code === "string"
        ? firebaseError.code.replace("auth/", "").replace(/-/g, " ")
        : firebaseError.message ?? "Unable to send the reset email.";
      return { success: false, error: message };
    }
  },

  logout: () => {
    auth.signOut();
    set((state) => ({ ...state, currentUser: null }));
    localStorage.removeItem("currentUser");
  },

  getTotalUsers: async () => {
    try {
      
      const colRef = collection(db, "users");
      const snapshot = await getDocs(colRef);
      return snapshot.size;
    } catch {
      return -1;
    }
  },

  loadUsersForSearch: async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map((userDoc) => ({
        ...sanitizeUserProfile(userDoc.data()),
        id: userDoc.id,
      }));
      return { success: true, data: usersList };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return { success: false, error: message };
    }
  },

  removeStoredUserPasswords: async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const profilesWithPasswords = snapshot.docs.filter((userDoc) =>
        Object.prototype.hasOwnProperty.call(userDoc.data(), "password")
      );

      for (let start = 0; start < profilesWithPasswords.length; start += 450) {
        const batch = writeBatch(db);
        profilesWithPasswords.slice(start, start + 450).forEach((userDoc) => {
          batch.update(userDoc.ref, { password: deleteField() });
        });
        await batch.commit();
      }

      return { success: true, data: profilesWithPasswords.length };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Could not remove stored password fields.",
      };
    }
  },

  fetchAllUsers: async (
    pageSize = 10,
    lastUser: User | null = null,
    firstUser: User | null = null,
    direction: "next" | "prev" = "next",
    sortKey = "name",
    sortOrder: OrderByDirection = "asc"
  ) => {
    try {
      

    const colRef = collection(db, "users");
    const sortField = sortKey === "id" ? documentId() : sortKey;
    const baseQuery = sortKey === "id"
      ? query(colRef, orderBy(documentId(), sortOrder))
      : query(colRef, orderBy(sortField, sortOrder), orderBy(documentId(), sortOrder));
    const cursorValues = (user: User) => sortKey === "id"
      ? [user.id]
      : [user[sortKey], user.id];

    let queryRef;

    if (direction === "next" && lastUser) {
      queryRef = query(baseQuery, startAfter(...cursorValues(lastUser)), limit(pageSize));
    } else if (direction === "prev" && firstUser) {
      queryRef = query(baseQuery, endBefore(...cursorValues(firstUser)), limitToLast(pageSize));
    } else {
      // Initial load
      queryRef = query(baseQuery, limit(pageSize));
    }

    // Fetch current page
    const usersSnapshot = await getDocs(queryRef);
    const usersList = usersSnapshot.docs.map((userDoc) => ({
      ...sanitizeUserProfile(userDoc.data()),
      id: userDoc.id,
    }));

    // Use the baseQuery for checking previous and next page availability
    const firstVisible = usersSnapshot.docs[0];
    const lastVisible = usersSnapshot.docs[usersSnapshot.docs.length - 1];

    // Update current page cursors in store
    set(
      produce((state: IStore) => {
        state.users = usersList;
        state.firstUser = firstVisible
          ? { ...sanitizeUserProfile(firstVisible.data()), id: firstVisible.id }
          : null;
        state.lastUser = lastVisible
          ? { ...sanitizeUserProfile(lastVisible.data()), id: lastVisible.id }
          : null;
      })
    );

    // Build queries from the baseQuery for checking availability
    let nextAvailable = false;
    let previousAvailable = false;
    const availabilityQueries: Promise<void>[] = [];

    if (lastVisible) {
      const cursor = sortKey === "id" ? [lastVisible.id] : [lastVisible.get(sortKey), lastVisible.id];
      availabilityQueries.push(getDocs(query(baseQuery, startAfter(...cursor), limit(1))).then((snapshot) => {
        nextAvailable = !snapshot.empty;
      }));
    }
    if (firstVisible) {
      const cursor = sortKey === "id" ? [firstVisible.id] : [firstVisible.get(sortKey), firstVisible.id];
      availabilityQueries.push(getDocs(query(baseQuery, endBefore(...cursor), limitToLast(1))).then((snapshot) => {
        previousAvailable = !snapshot.empty;
      }));
    }
    await Promise.all(availabilityQueries);

    set(
      produce((state: IStore) => {
        state.hasNextPage = nextAvailable;
        state.hasPreviousPage = previousAvailable;
      })
    );

      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error fetching users:", message);
      return { success: false, error: message };
    }
  },
}));

export default useUserStore;
export const { getState, setState, subscribe } = useUserStore;
