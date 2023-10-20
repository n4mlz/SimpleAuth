import { initializeApp, FirebaseError } from 'firebase/app';
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
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return error.code
    } else {
      console.log('sign up error');
    }
  }
}

async function SignIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return error.code
    } else {
      console.log('sign in error');
    }
  }
}

async function SignOut() {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return error.code
    } else {
      console.log('sign out error');
    }
  }
}

export { auth, SignUp, SignIn, SignOut }