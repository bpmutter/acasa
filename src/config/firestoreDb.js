import app from './firebaseApp';
import firebase from 'firebase';

const db = firebase.firestore(app);

export default db;
