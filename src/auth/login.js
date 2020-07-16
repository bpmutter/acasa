import db from "../config/firestoreDb";
import firebase from 'firebase';

export default async function login(userId){
    const uid = firebase.auth().currentUser.uid;
    
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
        return doc.data();
    }
}
