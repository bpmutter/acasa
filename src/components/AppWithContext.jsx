import React, {useState, useEffect} from 'react';
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
import loginFirebase from '../auth/login';
import loginOnPageLoadFirebase from '../auth/loginOnPageLoad';
import demoLoginFirebase from "../auth/demoLoginFirebase";

const AppContext = () => {
    const loggedInFromLS = JSON.parse(localStorage.getItem('loggedIn'))
    const [loggedIn, setLoggedIn] = useState(loggedInFromLS);
    const [user, setUser] = useState({username: ""})
    const [errors, setErrors] = useState([]);

    const signUp = async (authResult) => {
      const userId = await signupFirebase(authResult);
      if(userId){
        logIn();
      } else{
        setErrors(["It looks like there is already an account using this email. Log in with that account or choose a new log in method", ...errors]);
      } 
    }
    const logIn = async () => {
        const user  = await loginFirebase();
        setUser(user);
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
    }
    const demoLogin = async () => {
      const user = await demoLoginFirebase();
      setUser(user);
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
    }
    const logOut = () => {
      logoutFirebase()
      setLoggedIn(false);
      setUser({ username: "" });
      localStorage.setItem('loggedIn', false)
    }
    useEffect( ()=>{
      if(loggedIn){
        (async ()=> {
          await loginOnPageLoadFirebase(setUser);
        })()
      }
    },[loggedIn]);   

    const context = { user, loggedIn, logIn, logOut, signUp, demoLogin };

    return (
      <Context.Provider value={context}>
        <ThemeProvider theme={themeLight}>
          <App />
        </ThemeProvider>
      </Context.Provider>
    );
}

export default AppContext