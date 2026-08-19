import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyC275h1iGzeLyitVdJ73JpyFByX3VPtiU8',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'keep-clone-706a6.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'keep-clone-706a6',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'keep-clone-706a6.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '439933063363',
  appId: env.VITE_FIREBASE_APP_ID || '1:439933063363:web:1309d4f813d8bae75b9276',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-TNTTDY5VW7'
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export let analytics = null;

isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch(() => {
    analytics = null;
  });

export default app;
