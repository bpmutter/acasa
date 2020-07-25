import db from "../../config/firestoreDb";
import firebase from 'firebase';
export default async function getUserByUidAuth(stateSetterCb) {


  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      const res = await db.collection("users").doc(uid).get();
      if (res.empty) {
        stateSetterCb(null)
      }
      stateSetterCb(res.data())

    } 
  });
  
}

