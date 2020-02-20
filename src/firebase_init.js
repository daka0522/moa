// Firebase Utils
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/firebase-storage'
import 'firebase/firebase-functions'
import 'firebase/auth'
import 'firebase/firebase-database'
// import * as firebaseui from 'firebaseui' 

// Config
import firebaseConfig from './firebase_config.js'

firebase.initializeApp(firebaseConfig);

export default firebase
