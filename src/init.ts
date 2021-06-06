// Firebase Utils
import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/firestore"
import "firebase/firebase-storage"
import "firebase/firebase-functions"
import "firebase/auth"
import "firebase/firebase-database"
// import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: "AIzaSyAvqQMYFALfQ2Q1yfbyXoTbxzVjRVZI4Do",
  authDomain: "moa-now.firebaseapp.com",
  databaseURL: "https://moa-now.firebaseio.com",
  projectId: "moa-now",
  storageBucket: "moa-now.appspot.com",
  messagingSenderId: "341278082207",
  appId: "1:341278082207:web:6c7f9acc74c464b8884eaa",
  measurementId: "G-YXTCVQP64F",
}

firebase.initializeApp(firebaseConfig)

export default firebase
