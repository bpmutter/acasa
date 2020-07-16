import React, { useEffect, useState, useContext } from "react";
import MainContentWrapper from "./MainContentWrapper";
import UserProfileInfo from "./UserProfileInfo";
import UserListings from "./UserListings";
import data from "../testData";
import getUser from "../queries/getUserProfileByAuth";
import db from "../config/firestoreDb";
import { format } from "date-fns";
import firebase from 'firebase';
import dateFormatter from "../utils.js/dateFormatter";
const ben = data.ben;
const listings = data.listings;


export default function UserPage() {

  const [user, setUser] = useState();

  useEffect(() => {
  //   TODO: refactor to put in another component...just throwing code elsewhere
  // was causing problems...i think it might have to do w fact that this uses
  // web sockets
  const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      const res = await db.collection("users").doc(uid).get();
      if (res.empty) {
        console.log("No matching documents.");
        setUser(null);
        return unsubscribe();
      }
      const profileUser = res.data();
      profileUser.joined = dateFormatter(profileUser.date_added);
 
      setUser(profileUser);
      return unsubscribe();
    }
  });
  }, []);

  const userVal = user || ben;
  // console.log('user val::',userVal.date_added.toDateString())
  
  return (
    <MainContentWrapper>
      <UserProfileInfo user={userVal} profile/>
      <UserListings user={userVal} listings={listings} />
    </MainContentWrapper>
  );
}
