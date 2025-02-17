import { /* collection, addDoc, */ setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, /* updateProfile */ } from "firebase/auth";
import { auth, db } from "./firebase";
import { User } from "../types/default-type";


// Function to add users to Firebase Authentication and Firestore
export const generateUsers = async (users:User[]) => {
  for (const user of users) {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      
      const userRef = doc(db, "users", userCredential.user.uid);
      
      // Store user details in Firestore (excluding password)
      await setDoc(userRef, user);

      // const createdUser = userCredential.user;
      
      // Update user profile
      // await updateProfile(createdUser, { displayName: user.name });

      // // Add user details to Firestore
      // await addDoc(collection(db, "users"), {
      //   id: createdUser.uid,
      //   name: user.name,
      //   email: user.email,
      //   phone: user.phone,
      //   role: "subscriber",
      //   createdAt: new Date().toISOString(),
      // });

      console.log(`Created user: ${user.name} (${user.email})`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }

  console.log("User creation complete!");
};

// Run the function
// generateUsers().catch(console.error);
