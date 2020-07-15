import firebase from 'firebase';


export default function logout(){
    firebase.auth().signOut();
}