/**
 * Firebase Configuration
 * UniRoute - Overseas Education Consultancy
 */

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8QXUyAUmWLfxeejaTx9c6chDJUxNDVPY",
  authDomain: "uniroute-161e3.firebaseapp.com",
  projectId: "uniroute-161e3",
  storageBucket: "uniroute-161e3.firebasestorage.app",
  messagingSenderId: "73320809288",
  appId: "1:73320809288:web:4ae1f4b56233f489f1e97d",
  measurementId: "G-VEZXM796FK"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)

// Auth Providers
const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider('apple.com')

// Configure Apple Provider
appleProvider.addScope('email')
appleProvider.addScope('name')

export {
  app,
  analytics,
  auth,
  googleProvider,
  appleProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
}