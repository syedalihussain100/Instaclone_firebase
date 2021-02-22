import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBGGRd2s22FBAeb8L5Uw48GwWy0NcYy2t8",
  authDomain: "instaclone-61144.firebaseapp.com",
  projectId: "instaclone-61144",
  storageBucket: "instaclone-61144.appspot.com",
  messagingSenderId: "1083853423076",
  appId: "1:1083853423076:web:4b66438ccc484cb46987f1",
  measurementId: "G-B3BP2T7P34",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
