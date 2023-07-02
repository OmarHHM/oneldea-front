import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCzAaWExyu279rZuYPZNfSQHELftN3wTeU",
    authDomain: "oneldea.firebaseapp.com",
    databaseURL: "https://oneldea-default-rtdb.firebaseio.com",
    projectId: "oneldea",
    storageBucket: "oneldea.appspot.com",
    messagingSenderId: "404630617602",
    appId: "1:404630617602:web:edbcd6de78e4e343a4311b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
