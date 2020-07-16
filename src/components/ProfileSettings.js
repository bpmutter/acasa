import React, {useState} from 'react';
import MainContentWrapper from './MainContentWrapper';
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import firebase from 'firebase';
import db from "../config/firestoreDb";
import ContentPaper from './ContentPaper';
import LanguageInput from './LanguagesInput';
import GoogleMapsAutoComplete from './GoogleMapsSearchBox';
const useStyles = makeStyles((theme) => ({
  root: {
    //
  },
  textInput: {
    width: 300
  },
  sectionDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    margin: theme.spacing(2),
    fontFamily: theme.typography.special,
    // color: theme.palette.primary.main,
  },
}));


export default function EditProfile(){
    const classes = useStyles();
    const [user, setUser] = useState({});
  
  // TODO: refactor to put in another component...just throwing code elsewhere
  // was causing problems...i think it might have to do w fact that this uses
  // web sockets
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      const res = await db.collection("users").doc(uid).get();
      if (res.empty) {
        console.log("No matching documents.");
        setUser(null);
        return;
      }
      setUser(res.data());
      return;
    }
  });

    return (
      <MainContentWrapper>
        <ContentPaper>
          <Typography variant="h4" component="h3" color="primary">
            Edit Account Info
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.primaryInfo}>
              <div>
                <TextField
                  id="first-name"
                  label="First Name"
                  color="secondary"
                  className={classes.textInput}
                  required
                />
              </div>
              <div>
                <TextField
                  id="last-name"
                  label="Last Name"
                  color="secondary"
                  className={classes.textInput}
                  required
                />
              </div>
            </div>
            <Divider className={classes.sectionDivider} />
            <div className={classes.contact}>
              <Typography variant="h5" component="h3" color="primary">
                Contact Information
              </Typography>
              <div>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  color="secondary"
                  className={classes.textInput}
                  helperText="This email is just for guests to contact you. It will not affect your login account"
                  required
                />
              </div>
              <div>
                <TextField
                  id="phone"
                  label="Phone"
                  type="tel"
                  color="secondary"
                  className={classes.textInput}
                />
              </div>
              <div>
                <TextField
                  id="website"
                  label="Website"
                  type="url"
                  color="secondary"
                  className={classes.textInput}
                />
              </div>
              <div>
                <TextField
                  id="whatsapp"
                  label="Whatsapp"
                  type="tel"
                  color="secondary"
                  className={classes.textInput}
                />
              </div>
            </div>
            <Divider className={classes.sectionDivider} />
            <div className={classes.additionalInfo}>
              <Typography variant="h5" component="h3" color="primary">
                Additional Information
              </Typography>
              <div>
                <TextField
                  id="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  color="secondary"
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <LanguageInput value={user.languages} />
              </div>
              <div>
                <GoogleMapsAutoComplete
                  variant="standard"
                  label="Location"
                  className={classes.textInput}
                />
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Update Profile
              </Button>
            </div>

            {/* TODO: change username functionality */}
            {/* this will take some config with the DB to do in a non-hacky way */}
            {/* gotta present race conditions and all that */}
            {/* <TextField id="standard-basic" label="Username"/> */}
          </form>
        </ContentPaper>
      </MainContentWrapper>
    );
}