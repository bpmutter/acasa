import React, { useEffect, useState, useContext } from "react";
import MainContentWrapper from "./MainContentWrapper";
import UserProfileInfo from "./UserProfileInfo";
import UserListings from "./UserListings";
import data from "../testData";
import getUser from "../queries/getUserProfileByAuth";
import db from "../config/firestoreDb";

import firebase from 'firebase';
const ben = data.ben;
const listings = data.listings;


export default function UserPage() {

  const [user, setUser] = useState({});

  
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      const res = await db.collection("users").doc(uid).get();
      if (res.empty) {
        console.log("No matching documents.");
        setUser(null)
      }
      setUser(res.data());
    }
  });

//   useEffect(() => {
//     (async () => {
//       const userFromUid = await getUser();
//       console.log('user from id::', userFromUid)
//       setUser(userFromUid);
//     })();
//   });
  const userVal = user || ben;

  return (
    <MainContentWrapper>
      <UserProfileInfo user={userVal} />
      <UserListings user={ben} listings={listings} />
    </MainContentWrapper>
  );
}
