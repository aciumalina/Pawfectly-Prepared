// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANOU45y4Ce122bXfjU_tewKTb9XgL5aZo",
    authDomain: "pawfectly-prepared.firebaseapp.com",
    projectId: "pawfectly-prepared",
    storageBucket: "pawfectly-prepared.appspot.com",
    messagingSenderId: "895295762669",
    appId: "1:895295762669:web:716ea8b58130ab7c721ce4",
    measurementId: "G-PDGXMHFXMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//intialize firestore
const db = getFirestore(app);
//const db = getDatabase(app);

//const auth = getAuth(app); //initialize the authentication module
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { db, app, auth };
