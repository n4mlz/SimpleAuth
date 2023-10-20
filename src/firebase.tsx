import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAY_kd7k7qV8Q3ZCuCGdyCnKS_LoS39FJE",
  authDomain: "simpleauth-333a3.firebaseapp.com",
  projectId: "simpleauth-333a3",
  storageBucket: "simpleauth-333a3.appspot.com",
  messagingSenderId: "384275033184",
  appId: "1:384275033184:web:9319996b645562dfa92705"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function SignUp(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    alert('sign up done');
    return user
  } catch (error) {
    alert('sign up error');
  }
}

async function SignIn(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    alert('sign in done');
    return user
  } catch (error) {
    alert('sign in error');
  }
}

async function SignOut() {
  try {
    await signOut(auth);
    console.log('sign out done')
  } catch (error) {
    console.log('sign out error')
  }
}

export { auth, SignUp, SignIn, SignOut }