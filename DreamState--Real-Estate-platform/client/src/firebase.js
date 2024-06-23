// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dream-state-b3772.firebaseapp.com",
  projectId: "dream-state-b3772",
  storageBucket: "dream-state-b3772.appspot.com",
  messagingSenderId: "700937154723",
  appId: "1:700937154723:web:1a5127b527da4367eacf16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Firebase Storage bucket rules
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')