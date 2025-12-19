import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

/**
 * Firebase Configuration
 * Values loaded from environment variables for security
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase only if config is available
let app = null
let analytics = null

// Check if Firebase config is properly set
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig)
    // Initialize Analytics (only in browser)
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app)
    }
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message)
  }
}

export { analytics }
export default app
