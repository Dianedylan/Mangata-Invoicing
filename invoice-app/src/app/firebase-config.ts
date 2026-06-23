import * as firebase from 'firebase/app';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeHrTS7BRuqxwPrC1FqQrd94t4WKo6zuY",
  authDomain: "mangatainvoice.firebaseapp.com",
  databaseURL: "https://mangatainvoice-default-rtdb.firebaseio.com",
  projectId: "mangatainvoice",
  storageBucket: "mangatainvoice.firebasestorage.app",
  messagingSenderId: "968816772353",
  appId: "1:968816772353:web:4d832954b7e847ca75c700",
  measurementId: "G-MBS3HG3STY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();