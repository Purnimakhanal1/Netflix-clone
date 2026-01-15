
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB0_lBvnOIJ_Gu2n6vYrSgMm2iwUKDMwAk",
  authDomain: "netflix-clone-75825.firebaseapp.com",
  projectId: "netflix-clone-75825",
  storageBucket: "netflix-clone-75825.firebasestorage.app",
  messagingSenderId: "229556837738",
  appId: "1:229556837738:web:b5bb94e4aebc371dd25913"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const handleAuthError = (error) => {
  console.error("Auth error:", error);
  let errorMessage;
  switch (error.code) {
    case 'auth/user-not-found':
      errorMessage = 'No user found with this email.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect password.';
      break;
    case 'auth/invalid-email':
      errorMessage = 'Invalid email address.';
      break;
    case 'auth/user-disabled':
      errorMessage = 'This account has been disabled.';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'Email is already in use.';
      break;
    case 'auth/weak-password':
      errorMessage = 'Password is too weak.';
      break;
    default:
      errorMessage = `An error occurred: ${error.message}`;
  }
  toast.error(errorMessage);
  throw error;
};

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (error) {
    handleAuthError(error);
  }
};

const login_pg = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful", userCredential.user);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("An error occurred during logout. Please try again.");
  }
};

export { auth, db, login_pg, signup, logout };