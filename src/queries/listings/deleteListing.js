import db from "../../config/firestoreDb";
import firebase from "firebase";
import geoListings from "../../config/geofirestore";

export default async function deleteListing(listingId, setRes){

    const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {    
        if(user){
            try{
                const res = await geoListings.doc(listingId).delete();
                setRes({
                    message: {
                        type: "success",
                        content: "Your listing was successfully deleted.",
                    },
                });
            } catch(err){
                console.error('POSTING PROBLEM::', err);
                setRes({
                    message: {
                        type: "error",
                        content: "There was a problem deleting your listing. Please try again later",
                    },
                });
            }
            unsubscribe();
        }
    })
}