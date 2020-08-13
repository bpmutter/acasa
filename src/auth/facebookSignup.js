import db from "../config/firestoreDb";
import firebase from "firebase";

export default async function facebookSignup(authResult) {
  console.log('FACEBOOK SIGN UP', authResult)
  const {
    additionalUserInfo: { isNewUser, profile },
  } = authResult;

  const uid = await firebase.auth().currentUser.uid;
  const newUser = {};

  //create unique username with timestamp
  let timestamp = new Date();
  timestamp = timestamp.getTime();
  newUser.username = `${profile.first_name
    .split(" ")
    .join("")
    .toLowerCase()}-${profile.last_name
    .split(" ")
    .join("")
    .toLowerCase()}-${timestamp}`;

  newUser.first_name = profile.first_name;
  newUser.last_name = profile.last_name;
  newUser.profile_picture = profile.picture.data.url;
  newUser.contact = {
    email: profile.email,
  };

  const creationTime = new Date();
  newUser.date_added = creationTime;
  newUser.date_updated = creationTime;
  newUser.oAuthInfo = profile;
  newUser.uid = uid;
  newUser.contact.email = profile.email;

  let userId = null;
  if (isNewUser || profile.email === "zeebz112@gmail.com") {
    try {
      const res = await db.collection("users").doc(uid).set(newUser);
    } catch (err) {
      console.error(err);
    }
    userId = uid;
  } else
    alert(
      `You've already made an account with the email ${profile.email}. Please log in with that account.`
    );
  return userId;
}
