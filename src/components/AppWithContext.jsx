import React, {useState} from 'react';
import App from './App';
import {
  ThemeProvider,
} from "@material-ui/core/styles";
import {themeLight} from '../theme/theme';
import Context from './Context.js'
import firebase from 'firebase'

import firebaseConfig from "../config/firebaseConfig";
firebase.initializeApp(firebaseConfig);

const AppContext = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const logIn = (user) => {
      //TODO
        //get user information from the DB using info provided in 'user' here
        //set context to reflect this
        setLoggedIn(true)
    }
    const logOut = () => {
      firebase.auth().signOut();
      setLoggedIn(false);
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        
      } else {
        console.log('bummer....')
      }
    });

    const context = { loggedIn, logIn, logOut };

    return (
      <Context.Provider value={context}>
        <ThemeProvider theme={themeLight}>
          <App />
        </ThemeProvider>
      </Context.Provider>
    );
}

export default AppContext