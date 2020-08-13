// Import FirebaseAuth and firebase.
import React, {useContext, useState} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import logo from "../theme/logo-big.webp";
import {Link, Box, Typography, makeStyles, Button} from '@material-ui/core';
import context from './Context';
import DemoLogin from './DemoLogin';

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 50,
    paddingBottom: theme.spacing(1)
  },
  title: {
      fontFamily: theme.typography.special,
      color: theme.palette.primary.dark,
  }
}));

const SignUp = () => {
    // The component's Local state.
    // state = {
    //     isSignedIn: false, // Local signed-in state.
    // };
  const classes = useStyles();
  const {loggedIn, logIn, logOut, signUp} = useContext(context);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          'public_profile',
          'email',
        ],
        customParameters: {
          // Forces password re-entry.
          auth_type: 'reauthenticate'
        }
    },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        signUp(authResult);
        return false;
      },
    },
  };


    return (
      <Box>
        <div
          className={classes.titleWrapper}
        >
          <img src={logo} alt="aCasa logo" className={classes.logo} />
          <Typography
            variant="h4"
            component="h3"
            className={classes.title}
          >
            aCasa
          </Typography>
        </div>
        {!loggedIn ? (
          <div>
            <p>Sign up with one of the following methods:</p>
            <Typography variant="p" component="p" color="textSecondary">
              NOTE: You only need to sign up if you want to post a listing. If you're just looking for for your next home, you can browse and message the host without an account.
            </Typography>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
            <DemoLogin/>
          </div>
        ) : (
          <div>
            <p>
              Welcome {firebase.auth().currentUser.displayName}! You are now
              signed in!
            </p>
            <Button onClick={() => logOut()}>Go to Profile</Button>
          </div>
        )}
      </Box>
    );
  
}

export default SignUp;