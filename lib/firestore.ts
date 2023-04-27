import { initFirestore } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
}

const firestore = initFirestore({
    credential: cert(serviceAccount),
});

export {firestore}