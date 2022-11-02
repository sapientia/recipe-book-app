import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyC12qIuttbNFNw24Y9-vYsyCQzhnuFAXwg",
  authDomain: "db-recipe-52999.firebaseapp.com",
  databaseURL: "https://db-recipe-52999-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "db-recipe-52999",
  storageBucket: "db-recipe-52999.appspot.com",
  messagingSenderId: "1027409485444",
  appId: "1:1027409485444:web:3e437f8e764906bfac2cd1",
};

firebase.initializeApp(config);

export default firebase.database();
