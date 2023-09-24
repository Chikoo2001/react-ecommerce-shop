// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDIOgjL6hJiNr7lz_6EXISYq7TFS8UTJo",
  authDomain: "ecommerce-shop-9cef2.firebaseapp.com",
  projectId: "ecommerce-shop-9cef2",
  storageBucket: "ecommerce-shop-9cef2.appspot.com",
  messagingSenderId: "743529286605",
  appId: "1:743529286605:web:989da0294484987994d284"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 