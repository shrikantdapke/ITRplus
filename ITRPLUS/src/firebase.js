// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMKhOveIscJ-Nn_W6bX2ni1_TW4OBgKOk",
  authDomain: "fintech-a8806.firebaseapp.com",
  databaseURL: "https://fintech-a8806-default-rtdb.firebaseio.com",
  projectId: "fintech-a8806",
  storageBucket: "fintech-a8806.appspot.com",
  messagingSenderId: "7233255429",
  appId: "1:7233255429:web:aa3c4746495e936e24046c",
  measurementId: "G-PXR27YSVSP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, database, storage, analytics, ref, push, onValue };
