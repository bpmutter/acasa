// Import FirebaseAuth and firebase.
import React, {useContext, useState} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import logo from "../theme/logo-big.webp";
import {Link, Box, Typography, makeStyles, Button} from '@material-ui/core';
import context from './Context';
import DemoLogin from "./DemoLogin";

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
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
}));

const LogIn = () => {

  const classes = useStyles();
  const {loggedIn, logIn} = useContext(context);

  const uiConfig = {
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ["public_profile", "email"],
        customParameters: {
          // Forces password re-entry.
          auth_type: "reauthenticate",
        },
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        logIn(authResult);
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
            <Typography align="center">Log in with one of the following methods</Typography>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
            <DemoLogin/>
          </div>
        ) : (
          <div>
            <Typography align="center">
              Welcome back! You are now
              signed in!
            </Typography >
            <div className={classes.buttonWrapper}>
              <Button href="/profile">Go to Profile</Button>
              <Button href="/post">Post a Home</Button>
            </div>
          </div>
        )}
      </Box>
    );
  
}

export default LogIn;