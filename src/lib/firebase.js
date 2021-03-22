import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC2Y1dzPu73VYsRGKeoIKao-Zg7jkqppWI",
    authDomain: "announceme-668a6.firebaseapp.com",
    projectId: "announceme-668a6",
    storageBucket: "announceme-668a6.appspot.com",
    messagingSenderId: "692202342648",
    appId: "1:692202342648:web:8b949ed2946ce74dee930d",
    measurementId: "G-Q8E1VMNN4C"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export { auth, provider, storage }
export default db