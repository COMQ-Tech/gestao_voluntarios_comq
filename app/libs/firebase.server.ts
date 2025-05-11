import admin from "firebase-admin";

const firebaseAdminConfig = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG!);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  });
}

export const firestore = admin.firestore();

export default admin;
