import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)

export const storage = {
  storage: getStorage(app),
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL
}

export default app
