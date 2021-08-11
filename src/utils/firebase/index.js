import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCmHg0Tx3LjHMQ8MTMbNqxHIBG2hQ0WeKI",
  authDomain: "ecma-a7973.firebaseapp.com",
  projectId: "ecma-a7973",
  storageBucket: "ecma-a7973.appspot.com",
  messagingSenderId: "59741284933",
  appId: "1:59741284933:web:9c557b392aa82cbf2d512c"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;