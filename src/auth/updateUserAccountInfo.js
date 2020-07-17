import db from "../config/firestoreDb";
import firebase from "firebase";

export default async function createUserInDb({uid, firstName, lastName, email, phone, website, whatsapp, bio, languages, location}) {
  
    //TODO:: explore how to best update the profile info
  const uid = firebase.auth().currentUser.uid;
  const user = {};


  user.first_name = firstName;
  user.last_name = lastName;
  user.contact = {
    email, phone, website, whatsapp
  };


  user.date_updated = new Date();

  let userId = null;
  

  try {
    const res = await db.collection("users").doc(uid).set(user);
    console.log("res is....", res);
  } catch (err) {
    console.error(err);
  }
  userId = uid;
  
  console.log("user id before return", userId);
  return userId;

  // Add a new document in collection "cities" with ID 'LA'

  // [END set_document]
}
