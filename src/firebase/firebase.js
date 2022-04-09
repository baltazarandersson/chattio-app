import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnt8YJqL7EqfLTTDdXlVOnW02d5vMguo8",
  authDomain: "real-chatting-6d90b.firebaseapp.com",
  projectId: "real-chatting-6d90b",
  storageBucket: "real-chatting-6d90b.appspot.com",
  messagingSenderId: "179441742589",
  appId: "1:179441742589:web:b76638a1675da2d0fa4494",
  measurementId: "G-5YFDL6KN71",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
