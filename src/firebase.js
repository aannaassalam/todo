import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyANwK68sLcIxVPxFOJdeVxGode1rmEoaA0",
    authDomain: "todo-660d3.firebaseapp.com",
    databaseURL: "https://todo-660d3.firebaseio.com",
    projectId: "todo-660d3",
    storageBucket: "todo-660d3.appspot.com",
    messagingSenderId: "1073546787887",
    appId: "1:1073546787887:web:8b10cef176ab3abd299ada"
  };

  
const db = firebase.initializeApp(firebaseConfig).firestore();

export default db