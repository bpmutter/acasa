import firebase from 'firebase';
import login from './login';
export default async function loginOnPageLoad(setUser){
    const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
      if(user){
        const userData = await login();
        setUser(userData)
        unsubscribe();
      }
        })

}
