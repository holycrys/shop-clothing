import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrweOAu0n1XkqwVhC7Xoe4QoKZfer7x4g",
  authDomain: "shop-clothing-56fdd.firebaseapp.com",
  projectId: "shop-clothing-56fdd",
  storageBucket: "shop-clothing-56fdd.appspot.com",
  messagingSenderId: "367116527495",
  appId: "1:367116527495:web:fb8b5964baf3f8b9e51522"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user',error.message);
    }
  }
  return userDocRef;
};