const { randomUUID } = require("node:crypto");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { HttpsError, onCall } = require("firebase-functions/v2/https");

initializeApp();

function authErrorToHttpsError(error, traceId) {
  const code = error && typeof error.code === "string" ? error.code : "";
  if (code === "auth/user-not-found") {
    return new HttpsError(
      "not-found",
      "No Firebase Authentication account matches this user's ID or email."
    );
  }
  if (code === "auth/invalid-password" || code === "auth/weak-password") {
    return new HttpsError(
      "invalid-argument",
      "Firebase rejected the password. Choose a stronger password that meets the project's password policy."
    );
  }
  if (code === "auth/email-already-exists") {
    return new HttpsError("already-exists", "That email address is already used by another Firebase Authentication account.");
  }
  if (code === "auth/invalid-email") {
    return new HttpsError("invalid-argument", "Enter a valid email address.");
  }
  if (code === "auth/insufficient-permission") {
    return new HttpsError(
      "failed-precondition",
      "The Cloud Function service account is not permitted to update Firebase Authentication users."
    );
  }
  console.error(`updateUserPassword failed [${traceId}]`, {
    code: code || "unknown",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  return new HttpsError(
    "internal",
    `Password update failed (reference ${traceId}). Check the Cloud Function logs for this reference.`
  );
}

exports.updateUserPassword = onCall(async (request) => {
  const traceId = randomUUID();
  try {
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

    const { userId, email, password } = request.data || {};
    if (typeof userId !== "string" || userId.length === 0) {
      throw new HttpsError("invalid-argument", "A user ID is required.");
    }
    if (typeof email !== "string" || !email.includes("@")) {
      throw new HttpsError("invalid-argument", "A valid email address is required.");
    }
    if (password !== undefined && (typeof password !== "string" || password.length < 6)) {
      throw new HttpsError("invalid-argument", "Password must be at least 6 characters.");
    }

    const adminAuth = getAuth();
    let authUser;
    try {
      authUser = await adminAuth.getUser(userId);
    } catch (error) {
      if (error && error.code === "auth/user-not-found") {
        authUser = await adminAuth.getUserByEmail(email);
      } else {
        throw error;
      }
    }

    const updates = {};
    if (authUser.email !== email) updates.email = email;
    if (typeof password === "string" && password.length > 0) updates.password = password;
    if (Object.keys(updates).length === 0) return { success: true };

    await adminAuth.updateUser(authUser.uid, updates);
    return { success: true };
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    throw authErrorToHttpsError(error, traceId);
  }
});