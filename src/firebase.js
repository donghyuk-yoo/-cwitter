import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDz-Dv3H-hq7PInr0IaHKTH9B0c4tIF2kI",
    authDomain: "cwitter-852f2.firebaseapp.com",
    projectId: "cwitter-852f2",
    storageBucket: "cwitter-852f2.appspot.com",
    messagingSenderId: "367208070762",
    appId: "1:367208070762:web:27a755fb4327938d79d413"
  };

  export default firebase.initializeApp(firebaseConfig);