import React, {useState, useEffect, useContext} from 'react';
import MainContentWrapper from './MainContentWrapper';
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import Snackbar from './Snackbar';
import firebase from 'firebase';
import db from "../config/firestoreDb";
import ContentPaper from './ContentPaper';
import GoogleMapsAutoComplete from './GoogleMapsSearchBox';
import SelectMultiple from './SelectMultiple';
import updateUserAccountInfo from '../queries/users/updateUserAccountInfo';
import languageList from '../languages.json';
import {useHistory} from 'react-router-dom';
import DeleteAccountModal from './DeleteAccountModal';
import UpdateProfilePicture from './UpdateProfilePicture';
import Head from './Head';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  progressWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  form: {
    padding: theme.spacing(1),
    maxWidth: 500
  },
  demoInfo: {
    maxWidth: 500,
  },
  textInput: {
    width: 300,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  },
}));


export default function EditProfile(){
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useState({
      contact: {},
      location: {},
      languages: [],
    });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [languages, setLanguages] = useState([])
    const [location, setLocation] = useState({});
    const [snackbar, setSnackbar] = useState({
      msg: null,
      severity: null,
    });
  
  // TODO: refactor to put in another component...just throwing code elsewhere
  // was causing problems...i think it might have to do w fact that this uses
  // web sockets
  useEffect(()=>{
    const deactivate = firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        const uid = firebase.auth().currentUser.uid;
        const res = await db.collection("users").doc(uid).get();
        if (res.empty) {
          setUser(null);
          return;
        }
        const thisUser = res.data()
        setUser(thisUser);
        setLanguages(thisUser.languages);
        setFirstName(thisUser.first_name);
        setUsername(thisUser.username)
        setLastName(thisUser.last_name);
        setEmail(thisUser.contact.email);
        setPhone(thisUser.contact.phone);
        setWebsite(thisUser.contact.website);
        setWhatsapp(thisUser.contact.whatsapp);
        setProfilePicture(thisUser.profile_picture);
        setBio(thisUser.bio);
        setLocation(thisUser.location || {});
        return deactivate();
      }
    });
  },[]);
    
  const inputChangeHandler = e => {
    switch(e.target.name){
      case "firstName": 
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value)
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'website': 
        setWebsite(e.target.value);
        break;
      case 'whatsapp':
      setWhatsapp(e.target.value);
        break;
      case 'bio':
        setBio(e.target.value);
        break;
      case 'location':
        setLocation(e.target.value);
        break;
      case 'languages':
        setLocation(e.target.value);
        break;
      default: 
      return
    } 
  }
  const selectMultipleHandler = e => { 
    setLanguages(e.target.value)
  }
  const updateProfile = async () => {
    const uid = user.uid;
    const res = await updateUserAccountInfo({
      firstName, lastName, email, phone, website, whatsapp, bio, location, languages, uid, profilePicture, username
    });
    setSnackbar({ msg: res.message.content, severity: res.message.type });
    if(res.message.type){
      setTimeout(()=>{
        history.push('/profile')
      }, 1000)
    }
  }

  return (
    <>
      <MainContentWrapper>
        <Head title="Account Settings" description={"Edit your aCasa account settings here."} />
        <ContentPaper>
          <Typography
            variant="h4"
            component="h3"
            color="primary"
            className={classes.title}
          >
            Edit Account Info
          </Typography>
          {email === "acasademo@gmail.com" && (
            <div className={classes.demoInfo}>
              <Typography color="secondary" component="p" variant="h6">
                <b>Note:</b> Certain functionality has been disabled because
                you're signed in as the demo user.
              </Typography>
            </div>
          )}
          {!user.uid ? (
            <div className={classes.progressWrapper}>
              <CircularProgress size={100} />
            </div>
          ) : (
            <form className={classes.form} noValidate onSubmit={updateProfile}>
              <Divider className={classes.sectionDivider} />
              <UpdateProfilePicture user={user} />
              <Divider className={classes.sectionDivider} />
              <div className={classes.primaryInfo}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Name
                </Typography>
                <div>
                  <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name"
                    color="secondary"
                    value={firstName}
                    defaultValue={user.first_name}
                    className={classes.textInput}
                    onChange={inputChangeHandler}
                    disabled={email === "acasademo@gmail.com"}
                    required
                  />
                </div>
                <div>
                  <TextField
                    id="last-name"
                    label="Last Name"
                    name="lastName"
                    color="secondary"
                    value={lastName}
                    defaultValue={user.last_name}
                    className={classes.textInput}
                    onChange={inputChangeHandler}
                    disabled={email === "acasademo@gmail.com"}
                    required
                  />
                </div>
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.contact}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Contact Information
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  color="textSecondary"
                  style={{ marginBottom: ".5em" }}
                >
                  Prospective guests can use these methods to contact you.{" "}
                </Typography>
                <div>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    color="secondary"
                    value={email}
                    defaultValue={user.contact.email}
                    className={classes.textInput}
                    onChange={inputChangeHandler}
                    helperText="This email is just for guests to contact you. It will not affect your login account."
                    disabled={email === "acasademo@gmail.com"}
                    required
                  />
                </div>
                <div>
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    type="tel"
                    value={phone}
                    defaultValue={user.contact.phone}
                    color="secondary"
                    onChange={inputChangeHandler}
                    className={classes.textInput}
                  />
                </div>
                <div>
                  <TextField
                    id="website"
                    name="website"
                    label="Website"
                    type="url"
                    value={website}
                    defaultValue={user.contact.website}
                    color="secondary"
                    onChange={inputChangeHandler}
                    className={classes.textInput}
                  />
                </div>
                <div>
                  <TextField
                    id="whatsapp"
                    label="Whatsapp"
                    name="whatsapp"
                    value={whatsapp}
                    defaultValue={user.contact.whatsapp}
                    type="tel"
                    onChange={inputChangeHandler}
                    color="secondary"
                    className={classes.textInput}
                  />
                </div>
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.additionalInfo}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Additional Information
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  color="textSecondary"
                  style={{ marginBottom: ".5em" }}
                >
                  Add a bit more information for prospective guests to have a
                  better idea of who you are and why they should stay with you.
                </Typography>
                <div>
                  <TextField
                    id="bio"
                    name="bio"
                    label="Bio"
                    multiline
                    rows={4}
                    value={bio}
                    defaultValue={user.bio}
                    color="secondary"
                    onChange={inputChangeHandler}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <SelectMultiple
                    name="languages"
                    label="Languages"
                    defaultValue={languages}
                    options={languageList}
                    formSetter={setLanguages}
                  />
                </div>
                <div>
                  {location.description && (
                    <div style={{ paddingTop: ".5em", paddingBottom: ".5em" }}>
                      <Typography>
                        <b>Your current location is: </b> {location.description}
                      </Typography>
                    </div>
                  )}
                  <GoogleMapsAutoComplete
                    variant="standard"
                    label="Location"
                    name="location"
                    inputVal={location.description}
                    defaultValue={
                      user.location && user.location.description
                        ? user.location.description
                        : null
                    }
                    formSetter={setLocation}
                    className={classes.textInput}
                  />
                  {/* )} */}
                </div>
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={updateProfile}
                >
                  Update Profile
                </Button>
              </div>
              <Divider className={classes.sectionDivider} />
              {/* TODO: change username functionality */}
              {/* this will take some config with the DB to do in a non-hacky way */}
              {/* gotta present race conditions and all that */}
              {/* <TextField id="standard-basic" label="Username"/> */}
              <DeleteAccountModal
                user={user}
                disabled={email === "acasademo@gmail.com"}
              />
            </form>
          )}
        </ContentPaper>
      </MainContentWrapper>
      {snackbar.msg && (
        <Snackbar msgSeverity={snackbar.severity} msg={snackbar.msg} />
      )}
    </>
  );
}