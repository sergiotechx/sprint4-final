// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAivJ8dnsjgABIhXPTNOmxnLwv9ZJ010E",
  authDomain: "sprint4-food.firebaseapp.com",
  projectId: "sprint4-food",
  storageBucket: "sprint4-food.appspot.com",
  messagingSenderId: "605023554732",
  appId: "1:605023554732:web:3c2258330633e146bf2309",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
