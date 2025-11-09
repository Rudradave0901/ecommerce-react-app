// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsAA0n-sp40E__NoNRgmrRVJJwFvnrojo",
  authDomain: "e-commorce-react.firebaseapp.com",
  projectId: "e-commorce-react",
  storageBucket: "e-commorce-react.firebasestorage.app",
  messagingSenderId: "644196653606",
  appId: "1:644196653606:web:39a9cc09180cd826a524e7",
};

console.log("FIREBASE CONFIG:", firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
