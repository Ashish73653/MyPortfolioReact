import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug: Log Firebase config status
console.log('🔥 Firebase Config Status:', {
  apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
  authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing',
  projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
  storageBucket: firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing',
  appId: firebaseConfig.appId ? '✅ Set' : '❌ Missing',
});

// Debug: Log actual values (first few characters)
console.log('🔥 Firebase Config Values:', {
  apiKey: firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 10) + '...' : 'undefined',
  authDomain: firebaseConfig.authDomain || 'undefined',
  projectId: firebaseConfig.projectId || 'undefined',
  storageBucket: firebaseConfig.storageBucket || 'undefined',
  messagingSenderId: firebaseConfig.messagingSenderId || 'undefined',
  appId: firebaseConfig.appId ? firebaseConfig.appId.substring(0, 15) + '...' : 'undefined',
});

// Check if all required Firebase config values are present
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingKeys.length > 0) {
  console.error('❌ Missing Firebase configuration keys:', missingKeys);
  console.error('🔧 Please check your environment variables in GitHub repository secrets');
}

// Initialize Firebase only if config is complete
let app: any = null;
let auth: any = null;
let googleProvider: any = null;
let db: any = null;
let storage: any = null;

try {
  if (missingKeys.length === 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️ Firebase not initialized due to missing configuration');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

// Export with fallbacks
export { auth, googleProvider, db, storage };

// Admin email for authorization
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "ash1sh.1hakur10@gmail.com";

export default app;
