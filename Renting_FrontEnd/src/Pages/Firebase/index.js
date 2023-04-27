import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA1n4vrxLOOZHwL0pAs_ed1q5P9bHpYB1s",
    authDomain: "rentbuddy-741a3.firebaseapp.com",
    projectId: "rentbuddy-741a3",
    storageBucket: "rentbuddy-741a3.appspot.com",
    messagingSenderId: "459487043778",
    appId: "1:459487043778:web:3c5f84f38c474c20a69b5b",
    measurementId: "G-EZFGPHVMH8"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
