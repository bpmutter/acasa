import db from "../config/firestoreDb";
import firebase from "firebase";

export default async function demoLogin() {
  try{
    firebase
      .auth()
      .signInWithEmailAndPassword("acasademo@gmail.com", "abc123")
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });

    const uid = await firebase.auth().currentUser.uid;

    const userRef = await db.collection("users").doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      return;
    } else {
      const docData = doc.data();
      return docData;
    }
  } catch(err){
      console.error(err);
  }
  
}
