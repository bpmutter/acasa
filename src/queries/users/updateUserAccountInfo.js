import db from "../../config/firestoreDb";
import firebase from "firebase";

export default async function createUserInDb({uid, firstName, lastName, email, phone, website, whatsapp, bio, languages, location}) {
  if(!firstName || !lastName || !email){
    return {
      "message":{
        type: "error", 
        content: "Missing a required field."
      }
    }
  }
  const uidAuth = firebase.auth().currentUser.uid;
  if(uidAuth !== uid){
    return {
      "message":{
        type: "error", 
        content: "You're not authorized to perform this action."
      }
    }
  }

  const user = {};


  user.first_name = firstName;
  user.last_name = lastName;
  user.contact = {};
  user.contact.email = email;
  user.contact.phone = phone ||  "";
  user.contact.website = website ||  "";
  user.contact.whatsapp = whatsapp ||  "";

  user.bio = bio || "";
  user.location = location || {};
  user.languages = languages || [];


  user.date_updated = new Date();
 
  try {
    const res = await db.collection("users").doc(uid).update(user);
    //const listingRes = await db.collection('listings').where('owner.uid', '==', uid);
    //TODO: UPDATE OWNER TO THE NEW INFO FOR LISTINGS
    return {
      message: {
        type: "success",
        content: "Your account has been successfully updated.",
      },
    };
  } catch (err) {
    console.error(err);
    
    return { 
      message: {
        type: "error",
        content: "You're information was not updated. Please try again later.",
      },
    };
  }
}


