import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
