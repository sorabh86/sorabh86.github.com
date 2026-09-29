// src/store/users-store.ts

import { create } from "zustand";
import { produce } from "immer";
import { ResultObject, User, UserSortKey } from "../types/default-type";
import {
  collection,
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
  endBefore,
  limitToLast,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../db/firebase";

// Define the store interface
interface IStore {
  currentUser: User | null;
  users: User[] | null;
  firstUser: User | null;
  lastUser: User | null;

  // New pagination flags:
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  createUser: (user:User & {password:string}) => Promise<ResultObject>;
  updateUserById: (
    userId: string,
    userData: Omit<Partial<User>, "password">,
    password?: string
  ) => Promise<ResultObject>;
  updateCurrentUserProfile: (userId: string, profile: Pick<User, "name" | "phone" | "address">) => Promise<ResultObject>;
  deleteUserById: (userId: string) => Promise<ResultObject>;
  signup: (user: User) => Promise<ResultObject>;
  login: (email: string, password: string) => Promise<ResultObject>;
  sendPasswordReset: (email: string) => Promise<ResultObject>;
  logout: () => void;
  getTotalUsers: () => Promise<number>;
  fetchAllUsers: (
    pageSize: number,
    lastUser?: User | null,
    firstUser?: User | null,
    direction?: "next" | "prev",
    sortKey?: UserSortKey,
    sortOrder?: OrderByDirection
  ) => Promise<ResultObject>;
}

// Create Zustand store manually applying Immer
const useUserStore = create<IStore>((set, get) => ({
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"), // Load from localStorage
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
  updateUserById: async (userId, userData, password) => {
    let passwordChanged = false;
    try {
      if (password) {
        const updatePassword = httpsCallable<
          { userId: string; password: string },
          { success: boolean }
        >(functions, "updateUserPassword");
        await updatePassword({ userId, password });
        passwordChanged = true;
      }

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, userData, { merge: true });

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error updating user:", message);
      return {
        success: false,
        error: passwordChanged
          ? `Password changed, but the user profile could not be saved: ${message}`
          : message,
      };
    }
  },

  updateCurrentUserProfile: async (userId, profile) => {
    try {
      await setDoc(doc(db, "users", userId), profile, { merge: true });
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
    return createUser(user as User & {password:string});
  },

  login: async (email: string, password: string) => {
    try {
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        set((state) => ({ ...state, currentUser: userData }));
        localStorage.setItem("currentUser", JSON.stringify(userData));

        return { success: true };
      } else {
        return { success: false, error: "User data not found!" };
      }
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
    const usersList = usersSnapshot.docs.map((doc) => ({
      ...(doc.data() as User),
      id: doc.id,
    }));

    // Use the baseQuery for checking previous and next page availability
    const firstVisible = usersSnapshot.docs[0];
    const lastVisible = usersSnapshot.docs[usersSnapshot.docs.length - 1];

    // Update current page cursors in store
    set(
      produce((state: IStore) => {
        state.users = usersList;
        state.firstUser = firstVisible
          ? { ...(firstVisible.data() as User), id: firstVisible.id }
          : null;
        state.lastUser = lastVisible
          ? { ...(lastVisible.data() as User), id: lastVisible.id }
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
