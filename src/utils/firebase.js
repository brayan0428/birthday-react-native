import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBjdE7UrADofCvVNpay0Cg2sxRQkXG2J4E",
    authDomain: "birthday-a488e.firebaseapp.com",
    databaseURL: "https://birthday-a488e.firebaseio.com",
    projectId: "birthday-a488e",
    storageBucket: "birthday-a488e.appspot.com",
    messagingSenderId: "30696296646",
    appId: "1:30696296646:web:99299b60a6329cbb5107c7"
}

export default firebase.initializeApp(firebaseConfig)