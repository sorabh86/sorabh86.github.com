const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { HttpsError, onCall } = require("firebase-functions/v2/https");

initializeApp();

exports.updateUserPassword = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Sign in before changing a password.");
  }

  const adminProfile = await getFirestore()
    .collection("users")
    .doc(request.auth.uid)
    .get();
  if (!adminProfile.exists || adminProfile.data().role !== "admin") {
    throw new HttpsError("permission-denied", "Only administrators can change user passwords.");
  }

  const { userId, password } = request.data || {};
  if (typeof userId !== "string" || userId.length === 0) {
    throw new HttpsError("invalid-argument", "A user ID is required.");
  }
  if (typeof password !== "string" || password.length < 6) {
    throw new HttpsError("invalid-argument", "Password must be at least 6 characters.");
  }

  await getAuth().updateUser(userId, { password });
  return { success: true };
});