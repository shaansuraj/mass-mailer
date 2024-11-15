// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkc-_Mw24Qba5o9XL_4SBg7ow-4_YpDZE",
    authDomain: "mass-mailer-7ed04.firebaseapp.com",
    projectId: "mass-mailer-7ed04",
    storageBucket: "mass-mailer-7ed04.firebasestorage.app",
    messagingSenderId: "977446023997",
    appId: "1:977446023997:web:4e421dbc6f0f5b95350b54",
    measurementId: "G-65RN1G9V0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
