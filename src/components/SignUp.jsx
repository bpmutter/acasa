// Import FirebaseAuth and firebase.
import React, {useContext, useState} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import logo from "../theme/logo-big.webp";
import {Link, Box, Typography, makeStyles} from '@material-ui/core';
import context from './Context';



const SignInScreen = () => {
    // The component's Local state.
    // state = {
    //     isSignedIn: false, // Local signed-in state.
    // };
  const {loggedIn, logIn, logOut} = useContext(context);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log('auth result::', authResult)
        console.log("redirect url::", redirectUrl);
        logIn(authResult);
        return false;
      }
    },
  };

//   const unregisterAuthObserver = firebase
//       .auth()
//       .onAuthStateChanged((user) => (user ? login );
//   // Listen to the Firebase Auth state and set the local state.
//   componentDidMount() {
//     this.unregisterAuthObserver = firebase
//       .auth()
//       .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
//   }

//   // Make sure we un-register Firebase observers when the component unmounts.
//   componentWillUnmount() {
//     this.unregisterAuthObserver();
//   }


    return (
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            width: '100%'
          }}
        >
          <img src={logo} alt="aCasa logo" style={{ width: 50, paddingBottom: '.5em' }} />
          <Typography
            variant="h4"
            component="h3"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            aCasa
          </Typography>
        </div>
        {!loggedIn ? (
          <div>
            <p>Sign up with one of the following methods:</p>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        ) : (
          <div>
            <p>
              Welcome {firebase.auth().currentUser.displayName}! You are now
              signed-in!
            </p>
            <Link onClick={() => logOut()}>Sign out</Link>
          </div>
        )}
      </Box>
    );
  
}

export default SignInScreen;