import { db, storage } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const testFirestoreConnection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    console.log(`✅ Firestore Connected: Found ${querySnapshot.size} posts.`);
  } catch (error) {
    console.error("❌ Firestore Connection Failed:", error);
  }
};

const testStorageConnection = async () => {
  try {
    const testRef = ref(storage, "test-connection.txt");
    await uploadString(testRef, "Firebase Storage Test");
    const url = await getDownloadURL(testRef);
    console.log(`✅ Firebase Storage Connected: Test file uploaded at ${url}`);
  } catch (error) {
    console.error("❌ Firebase Storage Connection Failed:", error);
  }
};

const runTests = async () => {
  console.log("🔍 Testing Firebase Connection...");
  await testFirestoreConnection();
  await testStorageConnection();
  console.log("✅ Firebase Connection Tests Completed.");
};

runTests();
