import React, { useEffect, useState, useContext } from "react";
import MainContentWrapper from "./MainContentWrapper";
import UserProfileInfo from "./UserProfileInfo";
import UserListings from "./UserListings";
import data from "../testData";
import getUser from "../queries/users/getUserProfileByAuth";
import db from "../config/firestoreDb";
import firebase from 'firebase';
import dateFormatter from "../utils/dateFormatter";
import Head from './Head';

export default function UserPage() {

  const [user, setUser] = useState({
    first_name: '',
    languages: [],
    contact: {}
  });

  //make sure goes to top of window on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
  //   TODO: refactor to put in another component...just throwing code elsewhere
  // was causing problems...i think it might have to do w fact that this uses
  // web sockets
  const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      const res = await db.collection("users").doc(uid).get();
      if (res.empty) {
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

  const userVal = user; 
   
  return (
    <MainContentWrapper>
      {!!user.first_name && (

        <Head
          title="Profile"
          img={user.profile_picture}
          description={user.bio || ""}
        />
      )}
      <UserProfileInfo user={userVal} profile />
      <UserListings user={userVal} />
    </MainContentWrapper>
  );
}
