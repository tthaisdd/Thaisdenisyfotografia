// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_rb_BDYgPqOyrnFft_ayzP5vaLeWhqlI",
  authDomain: "thaisdenisyfotografia-61b44.firebaseapp.com",
  projectId: "thaisdenisyfotografia-61b44",
  storageBucket: "thaisdenisyfotografia-61b44.firebasestorage.app",
  messagingSenderId: "43837567097",
  appId: "1:43837567097:web:8b60e8b2b2f4452a2764a8",
  measurementId: "G-JB6H94F4BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);