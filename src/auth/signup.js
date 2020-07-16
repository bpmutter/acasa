import db from '../config/firestoreDb';
import firebase from 'firebase';


export default async function createUserInDb(authResult){
      const {
        additionalUserInfo: { isNewUser, profile},
      } = authResult;

      console.log('SIGN UP INFOOO::', authResult);
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


      let userId = null;
      if(isNewUser){
          console.log('if entered....')
        try{ 

            const res = await db.collection("users").doc(uid).set(newUser);
            console.log('res is....', res)
        }catch(err){ console.error(err)
        }
        userId = uid;

        
      }
      console.log('user id before return', userId)
      return userId;


      // Add a new document in collection "cities" with ID 'LA'
      
      // [END set_document]

}
