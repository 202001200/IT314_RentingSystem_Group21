import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'renting-system-se.firebaseapp.com',
    projectId: 'renting-system-se',
    storageBucket: 'renting-system-se.appspot.com',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_KEY,
    appId: '1:703949926835:web:0419ba53e55f25c7241bc6',
    measurementId: 'G-CVD7LQSCD9',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
