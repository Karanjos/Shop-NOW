// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(process.env.FIREBASE_SECRETE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_SECRETE_API_KEY,
  authDomain: "shop-now-6c54e.firebaseapp.com",
  projectId: "shop-now-6c54e",
  storageBucket: "shop-now-6c54e.appspot.com",
  messagingSenderId: "854808713308",
  appId: "1:854808713308:web:a7104b22fe4eed3ab92e99",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
