import firebase from 'firebase';
import login from './login';
export default function loginOnPageLoad(){
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        await login();
      }
    });
}
