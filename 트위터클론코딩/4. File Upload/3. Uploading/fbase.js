import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyB1-UKj2Q0ZeXQiun908JoiCbJex9JW1vw",

  authDomain: "nwitter-f4e82.firebaseapp.com",

  projectId: "nwitter-f4e82",

  storageBucket: "nwitter-f4e82.appspot.com",

  messagingSenderId: "652193144933",

  appId: "1:652193144933:web:cc173ba3a8d3c66311268c"

};




  const app = initializeApp(firebaseConfig);

  

  export const authService = getAuth(app);
  export const dbService = getFirestore();
  export const storageService = getStorage();