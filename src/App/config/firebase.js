import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1uTTrlJzxEpqqkGv1Vc50iTckh_XGu2w",
  authDomain: "galeagames-9585a.firebaseapp.com",
  projectId: "galeagames-9585a",
  storageBucket: "galeagames-9585a.appspot.com",
  messagingSenderId: "425646541578",
  appId: "1:425646541578:web:7acf34a4d1856ffbfa48f3",
  measurementId: "G-SVBZWLVW7Y",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
