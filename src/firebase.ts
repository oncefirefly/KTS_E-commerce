// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBnSkMF07RHIyMdYPP_A9lC8KZ6ao_iCo0',
  authDomain: 'kts-e-commerce.firebaseapp.com',
  databaseURL: 'https://kts-e-commerce-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'kts-e-commerce',
  storageBucket: 'kts-e-commerce.appspot.com',
  messagingSenderId: '739955834864',
  appId: '1:739955834864:web:0fd19a115754479112e735',
  measurementId: 'G-CGLHH5VKJY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
