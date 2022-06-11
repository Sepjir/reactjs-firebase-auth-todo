import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCf96hsiwaomIR71h0UnutYEICLA7oiOpc",
    authDomain: "reactjs-auth-fcc30.firebaseapp.com",
    projectId: "reactjs-auth-fcc30",
    storageBucket: "reactjs-auth-fcc30.appspot.com",
    messagingSenderId: "613210895542",
    appId: "1:613210895542:web:157cef8a78abd512ce2217"
  };
  
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db, auth}