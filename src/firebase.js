import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCNYp_HSaMtrSU94DKKek4Fv-wsUdtvTo",
    authDomain: "vue-olegzal.firebaseapp.com",
    databaseURL: "https://vue-olegzal-default-rtdb.firebaseio.com",
    projectId: "vue-olegzal",
    storageBucket: "vue-olegzal.firebasestorage.app",
    messagingSenderId: "712443750305",
    appId: "1:712443750305:web:9c67b6897b8569c5edcde0"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);
const auth = getAuth(firebase);
export { firebase, db, auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, ref, set };