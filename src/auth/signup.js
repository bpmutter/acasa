import db from '../config/firestoreDb';



export default async function createUserInDb(authResult){
      const {
        additionalUserInfo: { isNewUser, profile},
      } = authResult;

      console.log('SIGN UP INFOOO::', isNewUser, profile);
      
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


      let userId = null;
      if(!isNewUser){
        const res = await db
          .collection("users")
          .add(newUser)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            userId = docRef.id;
            console.log('user id::',userId)
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
        
      }
      console.log('user id before return', userId)
      return userId;


      // Add a new document in collection "cities" with ID 'LA'
      
      // [END set_document]

}
