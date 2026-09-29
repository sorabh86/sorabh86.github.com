const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { Timestamp, getFirestore } = require("firebase-admin/firestore");

const ownerUid = "qaWoIAEUaoRaMXT6SrBR9t2jFGv1";
const ownerEmail = "ssorabh.ssharma@gmail.com";
const projectId = process.env.FIREBASE_PROJECT_ID;

if (!projectId) {
  throw new Error("Set FIREBASE_PROJECT_ID to the intended Firebase project before running this script.");
}

initializeApp({
  credential: applicationDefault(),
  projectId,
});

async function provisionOwnerAdmin() {
  const authUser = await getAuth().getUser(ownerUid);
  if (authUser.email?.toLowerCase() !== ownerEmail) {
    throw new Error("The supplied Auth UID does not belong to the expected owner email.");
  }
  if (!authUser.emailVerified) {
    throw new Error("Verify the owner email in Firebase Authentication before provisioning admin access.");
  }

  const profileRef = getFirestore().collection("users").doc(ownerUid);
  const existingSnapshot = await profileRef.get();
  const existingProfile = existingSnapshot.exists ? existingSnapshot.data() : {};
  const now = Timestamp.now();
  const profile = {
    name: typeof existingProfile.name === "string" && existingProfile.name
      ? existingProfile.name
      : authUser.displayName || ownerEmail.split("@")[0],
    email: ownerEmail,
    phone: typeof existingProfile.phone === "string" ? existingProfile.phone : "",
    address: typeof existingProfile.address === "string" ? existingProfile.address : "",
    role: "admin",
    create_date: existingProfile.create_date ?? now,
    last_login: existingProfile.last_login ?? now,
  };
  await profileRef.set(profile);

  const action = existingSnapshot.exists ? "Updated" : "Created";
  console.log(`${action} admin profile at users/${ownerUid} in project ${projectId}.`);
}

provisionOwnerAdmin().catch((error) => {
  console.error("Admin profile was not provisioned:", error.message);
  process.exitCode = 1;
});