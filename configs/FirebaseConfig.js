// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAFFU9Y6F_s93P9oJbLqMZ2h_QeBClS7w",
  authDomain: "getsetgo-6cf11.firebaseapp.com",
  projectId: "getsetgo-6cf11",
  storageBucket: "getsetgo-6cf11.appspot.com",
  messagingSenderId: "809221243402",
  appId: "1:809221243402:web:579cfbefcb36e9269ed5f3",
  measurementId: "G-9B8P7SBV6C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);