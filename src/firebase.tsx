import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAY_kd7k7qV8Q3ZCuCGdyCnKS_LoS39FJE",
  authDomain: "simpleauth-333a3.firebaseapp.com",
  projectId: "simpleauth-333a3",
  storageBucket: "simpleauth-333a3.appspot.com",
  messagingSenderId: "384275033184",
  appId: "1:384275033184:web:9319996b645562dfa92705"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);