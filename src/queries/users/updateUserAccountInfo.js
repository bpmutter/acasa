import db from "../../config/firestoreDb";
import firebase from "firebase";
import {forEach} from 'p-iteration';
import getListingsByHostUsername from '../listings/getListingsByHostUsername';
import geoListings from "../../config/geofirestore";

export default async function createUserInDb({uid, firstName, lastName, email, phone, website, whatsapp, bio, languages, location, profilePicture, username}) {
  if(!firstName || !lastName || !email){
    return {
      "message":{
        type: "error", 
        content: "Missing a required field."
      }
    }
  }
  
  const {currentUser} = await firebase.auth();
  const uidAuth = currentUser.uid;
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
    const userListings = await getListingsByHostUsername(username);
    const newUserInfo = { 
      first_name: firstName, last_name: lastName, uid, username, 
      profile_picture: profilePicture || ""
    }
    await forEach(userListings, listing => {
        geoListings.doc(listing.id).update({
          owner: newUserInfo
        })
    })
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


