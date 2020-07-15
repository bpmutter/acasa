import config from './firebaseConfig'
import firebase from 'firebase';

const app = firebase.initializeApp(config);
firebase.analytics();

export default app
