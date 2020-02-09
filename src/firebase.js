// Firebase Utils
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/firebase-storage'
import 'firebase/firebase-functions'
import 'firebase/auth'
// import * as firebaseui from 'firebaseui' 

// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBju-mcOLVW-nErM5lbh1ODNm13K0k-lOg",
    authDomain: "rsch-artworks.firebaseapp.com",
    databaseURL: "https://rsch-artworks.firebaseio.com",
    projectId: "rsch-artworks",
    storageBucket: "rsch-artworks.appspot.com",
    messagingSenderId: "863124654763",
    appId: "1:863124654763:web:188521a80da935bc7d05ee",
    measurementId: "G-RS05CKWKC5"
  };

firebase.initializeApp(firebaseConfig);


export default firebase
