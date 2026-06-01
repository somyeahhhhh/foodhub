import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9PirFNxsGtnhlIX0w501UHLJ_19MHbz4",
  authDomain: "foodhub-97b0f.firebaseapp.com",
  projectId: "foodhub-97b0f",
  storageBucket: "foodhub-97b0f.firebasestorage.app",
  messagingSenderId: "366688704473",
  appId: "1:366688704473:web:2a9002aedec4aff520ebc8",
  measurementId: "G-HK106G23CT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
