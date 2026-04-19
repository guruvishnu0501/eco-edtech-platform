import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTYQXgQYz6Su1ASVBqp1rP_xw67MgMnIg",
  authDomain: "promptwars-697f4.firebaseapp.com",
  projectId: "promptwars-697f4",
  storageBucket: "promptwars-697f4.firebasestorage.app",
  messagingSenderId: "884479178496",
  appId: "1:884479178496:web:2b678bf301c246425525e5",
  measurementId: "G-K311D7H3V7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);