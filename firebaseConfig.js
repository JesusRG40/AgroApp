// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrz-mn7eDODu8sE0M8fAN3fn_mTgcWWas",
  authDomain: "agroapp-d4f2a.firebaseapp.com",
  projectId: "agroapp-d4f2a",
  storageBucket: "agroapp-d4f2a.appspot.com",
  messagingSenderId: "1095270379611",
  appId: "1:1095270379611:web:6ff934bc22d753d4d64f7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const signIn = signInWithEmailAndPassword;
export const signUp = createUserWithEmailAndPassword;
export const db = getFirestore(app);

