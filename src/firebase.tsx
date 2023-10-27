import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, updateProfile } from "firebase/auth";
import { getFirestore, DocumentReference, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const db = getFirestore(app);
const storage = getStorage(app);

async function SignUp(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return error.code
    } else {
      console.log("sign up error");
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
      console.log("sign in error");
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
      console.log("sign out error");
    }
  }
}

async function SendResetEmail(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return error.code
    } else {
      console.log("send reset email error");
    }
  }
}

async function SendVerifyEmail(user: User) {
  const mailsentRef: DocumentReference = doc(db, "mailsent", String(user?.uid));

  // メールをまだ送っていないか送ってから5分以上経過している場合はtrueを返す関数
  const checkDb = async () => {
    try {
      const time: Timestamp = (await getDoc(mailsentRef)).data()?.time;
      if (time) {
        return (Timestamp.now().seconds - time.seconds > 300);
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // メールを送れる場合は確認メールを送り、DBに時刻を記録
  if (await checkDb()) {
    sendEmailVerification(user);
    setDoc(mailsentRef, {
      userId: user?.uid,
      time: Timestamp.now()
    });
    return false;
  } else {
    return true;
  }
}

// プロフィールの入力形式が正しい場合はfirebaseに保存
async function sendProfile(
  user: User | null | undefined,
  username: string | undefined,
  iconFile: File | undefined,
  iconURL: string,
  birth: string | undefined,
  gender: string | undefined) {
  if (user && username && iconURL && birth && gender) {
    try {
      var photoURL: string | undefined = undefined;
      if (iconURL.includes("firebasestorage.googleapis.com")) {
        // 以前にプロフィール画像を設定していて、今回変更されなかった場合
        photoURL = iconURL;
      } else if (iconFile) {
        // プロフィール画像を更新する場合
        const iconRef = ref(storage, "user-image/" + user?.uid + "/icon." + iconFile.name.split('.').pop());
        await uploadBytes(iconRef, iconFile);
        photoURL = await getDownloadURL(iconRef);
      }
      // プロフィール情報を更新する
      updateProfile(user, { displayName: username, photoURL: photoURL });
      const profileRef: DocumentReference = doc(db, "profile", String(user?.uid));
      setDoc(profileRef, {
        userId: user.uid,
        displayName: username,
        photoURL: photoURL,
        birth: birth,
        gender: gender
      });
      // Homeに遷移
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
    return false;
  } else {
    // 入力情報に不備がある場合
    return true;
  }
}


export { auth, db, storage, SignUp, SignIn, SignOut, SendResetEmail, SendVerifyEmail, sendProfile };