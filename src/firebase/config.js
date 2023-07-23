import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider  } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAxQs7reY021HQGTRwz28qfDdo_MSWZ-3E",
  authDomain: "reactjs-nazariego.firebaseapp.com",
  projectId: "reactjs-nazariego",
  storageBucket: "reactjs-nazariego.appspot.com",
  messagingSenderId: "547660438616",
  appId: "1:547660438616:web:8484bbc47a9450719cbe2d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()