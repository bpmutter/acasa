import db from "../../config/firestoreDb";
import firebase from "firebase";
import { forEach } from "p-iteration";
import getListingsByHostUsername from "../listings/getListingsByHostUsername";
import geoListings from "../../config/geofirestore";

export default async function updateProfilePicture(imgURL) {


  const { currentUser } = await firebase.auth();
  const uid = currentUser.uid;
 
  try {
    const res = await db.collection("users").doc(uid).update({
        profile_picture: imgURL,
    });

    return {
      message: {
        type: "success",
        content: "Your profile picture has been successfully updated.",
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
