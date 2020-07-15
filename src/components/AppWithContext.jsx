import React, {useState} from 'react';
import App from './App';
import {
  ThemeProvider,
} from "@material-ui/core/styles";
import {themeLight} from '../theme/theme';
import Context from './Context.js'
import firebase from 'firebase'
import logoutFirebase from '../auth/logout';
import signupFirebase from '../auth/signup';
import '../config/firebaseApp'

const AppContext = () => {
    const loggedInFromLS = JSON.parse(localStorage.getItem('loggedIn'))
    const [loggedIn, setLoggedIn] = useState(loggedInFromLS);
    const [errors, setErrors] = useState([]);

    const signUp = async (authResult) => {
      const userId = await signupFirebase(authResult);
      if(userId){
        logIn(userId);
      } else{
        setErrors(["It looks like there is already an account using this email. Log in with that account or choose a new log in method", ...errors]);
        
      } 
    }
    const logIn = (userId) => {
      //TODO
        //get user information from the DB using info provided in 'user' here
        //set context to reflect this
        setLoggedIn(true)
        localStorage.setItem('loggedIn', true)
    }
    const logOut = () => {
      // firebase.auth().signOut();
      logoutFirebase()
      setLoggedIn(false);
      localStorage.setItem('loggedIn', false)
    }

    const context = { loggedIn, logIn, logOut, signUp };

    return (
      <Context.Provider value={context}>
        <ThemeProvider theme={themeLight}>
          <App />
        </ThemeProvider>
      </Context.Provider>
    );
}

export default AppContext