import db from "../config/firestoreDb";
import firebase from 'firebase';

export default async function login(){
    const uid = await firebase.auth().currentUser.uid;
    
    const userRef = await db.collection('users').doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
        return;
    } else {
        const docData = doc.data()
        return docData;
    }
}
