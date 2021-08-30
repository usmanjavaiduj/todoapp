import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
  apiKey: "AIzaSyBPEHGnWhLOE2__WVrQRtx3SPUzKPLX_uU",
  authDomain: "todo-ce8be.firebaseapp.com",
  databaseURL: "https://todo-ce8be-default-rtdb.firebaseio.com",
  projectId: "todo-ce8be",
  storageBucket: "todo-ce8be.appspot.com",
  messagingSenderId: "764891989346",
  appId: "1:764891989346:web:c971609c58aaf5dbfb583b"
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()
export { firebaseAuth, firebaseDb }