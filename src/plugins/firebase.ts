import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PJ_ID,
    storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId:import.meta.env.VITE_APP_ID,
};

const app  = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()

export {app, db, auth}