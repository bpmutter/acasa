import db from "../../config/firestoreDb";
import firebase from "firebase";
import deleteListingsByUsername from '../listings/deleteListingsByUsername';
import deleteUserAuth from "../../auth/deleteUser";
export default async function deleteUser(user) {
    console.log('user is...', user)
    try {
        await firebase.auth();
        await deleteListingsByUsername(user.username);
        await db.collection("users").doc(user.uid).delete();
        deleteUserAuth();


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
            content: "There was a problem deleting your account. Please try again later.",
        },
    };
  }
}
