import db from '../config/firestoreDb';
import firebase from 'firebase';


export default async function createUserInDb(authResult){
      const {
        additionalUserInfo: { isNewUser, profile},
      } = authResult;

      const uid = firebase.auth().currentUser.uid;
      const newUser = {};

      //create unique username with timestamp
      let timestamp = new Date();
      timestamp = timestamp.getTime();
      newUser.username = `${profile.given_name
        .split(" ")
        .join("")
        .toLowerCase()}-${profile.family_name
        .split(" ")
        .join("")
        .toLowerCase()}-${timestamp}`;
    
      newUser.first_name = profile.given_name;
      newUser.last_name = profile.family_name;
      newUser.profile_picture = profile.picture;
      newUser.contact = {
          email: profile.email
      };

      const creationTime = new Date();
      newUser.date_added = creationTime;
      newUser.date_updated = creationTime;
      newUser.oAuthInfo = profile;
      newUser.uid = uid;
      newUser.contact.email = profile.email;


      let userId = null;
      if(isNewUser){
        try{ 
            const res = await db.collection("users").doc(uid).set(newUser);
        }catch(err){ 
          console.error(err)
        }
        userId = uid;    
      }
      return userId;
}
