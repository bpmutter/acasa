import db from "../../config/firestoreDb";
import firebase from 'firebase';

export default function postListing(listing){
  const {title, type, active, price, start_date, end_date, location, 
                        location_description, shared, roommates, bedrooms, bathrooms,
                        max_guests, wifi_speed, rules, pets, lgbtq, living_with_host, primary_img 
                      } = listing;
  if(!title || !location || !type || !start_date 
    || !bedrooms || !bathrooms || !max_guests || !primary_img){ 
    return {
      "message":{
        type: "error", 
        content: "Missing one or more required fields."
      }
    }
  }

  let timestamp = new Date();
  timestamp = timestamp.getTime();
  const titleDash = title.split(" ").join("-")
  const id = encodeURI(`${titleDash.slice(0, 25)}-${timestamp}`);

  const newListing = {title, type, active, price, start_date, end_date, location, 
                        location_description, shared, roommates, bedrooms, bathrooms,
                        max_guests, wifi_speed, rules, pets, lgbtq, id, living_with_host,
                        created_at: timestamp, updated_at: timestamp, primary_img
                    }

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        const uid = firebase.auth().currentUser.uid;
        let user = await db.collection("users").doc(uid).get();
        user = user.data();
        const owner = { 
            first_name: user.first_name,
            last_name: user.last_name,
            profile_picture: user.profile_picture,
            uid: user.uid,
            username: user.username
        }
        newListing.owner = owner;

        try{ 
            const res = await db.collection('listings').doc(id).set(newListing);
            return {
              message: {
                type: "success",
                content: "Your Listing has been successfully posted.",
              },
              redirectId: id
            };

        } catch(err){
            console.error(err);
            return {
              message: {
                type: "error",
                content:
                  "There was an error posting your listing. Please try again later.",
              },
            };
        }
    }
  });
}