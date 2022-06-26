// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnC0xaoYNr6y9a5rQWRnKqgbc01Sv7HXA",
  authDomain: "firestore-svelte.firebaseapp.com",
  projectId: "firestore-svelte",
  storageBucket: "firestore-svelte.appspot.com",
  messagingSenderId: "637992759156",
  appId: "1:637992759156:web:e144c8d7af17d1c07d4621",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
