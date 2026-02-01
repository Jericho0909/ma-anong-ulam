import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBdtY1Nv7-rR5WAGGUzJCmsABJND42UWjo",
  authDomain: "ma-anong-ulam.firebaseapp.com",
  databaseURL: "https://ma-anong-ulam-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ma-anong-ulam",
  storageBucket: "ma-anong-ulam.firebasestorage.app",
  messagingSenderId: "186882306300",
  appId: "1:186882306300:web:3937dd554f4e934c196779"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };