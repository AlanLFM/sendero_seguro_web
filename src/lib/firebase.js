import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAOo3Eu3WI53r5DfunQDtOw_7d-u-9BbTU',
  authDomain: 'sendero-seguro-d181e.firebaseapp.com',
  projectId: 'sendero-seguro-d181e',
  storageBucket: 'sendero-seguro-d181e.firebasestorage.app',
  messagingSenderId: '447218372581',
  appId: '1:447218372581:web:fccdfffdd8000acd71a90c',
  measurementId: 'G-HHXRZ9W5HG'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
