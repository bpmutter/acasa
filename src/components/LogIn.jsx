// Import FirebaseAuth and firebase.
import React, {useContext, useState} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import logo from "../theme/logo-big.webp";
import {Link, Box, Typography, makeStyles, Button} from '@material-ui/core';
import context from './Context';

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
            <p>Log in with one of the following methods:</p>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        ) : (
          <div>
            <p>
              Welcome back! You are now
              signed in!
            </p>
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