import admin from "firebase-admin";
import { initializeApp as adminInitializeApp } from "firebase-admin/app";
import { initializeApp, getApps } from "firebase/app";

const firebaseAdminConfig = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG!);
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);

if (!admin.apps.length) {
  adminInitializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  });
}

export const Firebase = !getApps()?.length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const Firestore = admin.firestore();
export const FirebaseAdmin = admin;
export const FirebaseApplication = Firebase;
