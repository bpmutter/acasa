import db from "../../config/firestoreDb";
import firebase from "firebase";
import geoListings from "../../config/geofirestore";

export default async function postListing(listing, setRes) {
  const {
    title,
    id,
    type,
    description,
    active,
    price,
    start_date,
    end_date,
    location,
    location_description,
    shared,
    roommates,
    bedrooms,
    bathrooms,
    max_guests,
    wifi_speed,
    rules,
    pets,
    lgbtq,
    living_with_host,
    primary_img,
    additional_imgs,
    payment_methods,
  } = listing;
  if (
    !title ||
    !location ||
    !type ||
    !start_date ||
    !bedrooms ||
    !bathrooms ||
    !max_guests ||
    !primary_img
  ) {
    setRes({
      message: {
        type: "error",
        content: "Missing one or more required fields.",
      },
    });
    return;
  }

  let timestamp = new Date();
  let coordinates;
  if (location.geometry) {
    debugger;
    const { lat, lng } = location.geometry.location;
    coordinates = new firebase.firestore.GeoPoint(lat, lng);
  }

  const newListing = {
    title,
    id,
    type,
    active,
    price,
    start_date,
    end_date,
    location,
    description,
    location_description,
    shared,
    roommates,
    bedrooms,
    bathrooms,
    max_guests,
    wifi_speed,
    rules,
    pets,
    lgbtq,
    living_with_host,
    created_at: timestamp,
    updated_at: timestamp,
    primary_img,
    coordinates,
    additional_imgs,
    payment_methods,
  };
  const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      let user = await db.collection("users").doc(uid).get();
      user = user.data();
      const owner = {
        first_name: user.first_name,
        last_name: user.last_name,
        profile_picture: user.profile_picture,
        uid: user.uid,
        username: user.username,
      };
      newListing.owner = owner;

      try {
        const res = await geoListings.doc(id).update(newListing);
        setRes({
          message: {
            type: "success",
            content: "Your Listing has been successfully updated.",
          },
          redirectId: id,
        });
      } catch (err) {
        console.error(err);
        return {
          message: {
            type: "error",
            content:
              "There was an error updating your listing. Please try again later.",
          },
        };
      }
    }
  });
}
