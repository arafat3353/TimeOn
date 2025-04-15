// Replace with your own config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCOjAhAiSrQM6SCU10IeUI-c0JWobwyfqc",
    authDomain: "time-on-9f9d5.firebaseapp.com",
    projectId: "time-on-9f9d5",
    storageBucket: "time-on-9f9d5.appspot.com",
    messagingSenderId: "93352447787",
    appId: "1:93352447787:web:adc6e39335b14ca933bf6e"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  