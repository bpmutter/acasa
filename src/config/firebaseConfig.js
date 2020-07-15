const admin = require("firebase-admin");

const serviceAccount = require("../../../acasa-283314-89475ee8458c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acasa-bd3af.firebaseio.com"
});

const firebaseConfig = {
  apiKey: "AIzaSyAF9WtnzV6ZcalwDz_tXxbS2PNDLUkET-8",
  authDomain: "acasa-bd3af.firebaseapp.com",
  databaseURL: "https://acasa-bd3af.firebaseio.com",
  projectId: "acasa-bd3af",
  storageBucket: "acasa-bd3af.appspot.com",
  messagingSenderId: "425327876901",
  appId: "1:425327876901:web:fef97f39172473c6da18cc",
  measurementId: "G-T7F7CH36QN",
};

const db = admin.firestore();

export {db};

export default firebaseConfig;