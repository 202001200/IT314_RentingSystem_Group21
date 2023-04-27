import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC-OKo7AjUOZMdDA7Kpwsx4SXvXfhXzJN4",
  authDomain: "rentbuddy-9e8fd.firebaseapp.com",
  projectId: "rentbuddy-9e8fd",
  storageBucket: "rentbuddy-9e8fd.appspot.com",
  messagingSenderId: "971910604075",
  appId: "1:971910604075:web:dfad43ed883cf7d004916e",
  measurementId: "G-8RS6HW9QZ4"
};

const app=firebase.initializeApp(firebaseConfig);

const storage = firebase.storage(app);

export { storage, firebase as default };
