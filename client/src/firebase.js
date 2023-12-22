import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5uFb_PGlfYg3xqgIDsqbRSZ6FSlM5uV0",
    authDomain: "simple-blog-e41ae.firebaseapp.com",
    projectId: "simple-blog-e41ae",
    storageBucket: "simple-blog-e41ae.appspot.com",
    messagingSenderId: "741169655696",
    appId: "1:741169655696:web:456deb3d61ef4f7a530d15",
    measurementId: "G-QYX397B5C5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
