import React, {useState} from 'react';
import {Avatar, makeStyles, Typography, CircularProgress} from '@material-ui/core';
import Button from './Button';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import UploadOneImage from './UploadOneImage';
import updateProfilePicture from '../queries/users/updateUserProfilePicture';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.special,
    marginBottom: theme.spacing(1),
  },
  uploadWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  profilePicture: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing(2),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function UpdateProfilePicture({user, disabled, formSetter}){
    console.log('user is...', user)
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = useState(user.profile_picture);

    const setLoading = () => setProfilePicture(null)

    const uploadNewImage = async (imgURL) => {
        console.log(imgURL)
        await updateProfilePicture(imgURL);
        setProfilePicture(imgURL);
    }
    
    return (<>
      {!!user.first_name && <div className={classes.root}>
        <Typography
          component="h4"
          variant="h5"
          className={classes.title}
          color="primary"
        >
          Upload New Profile Picture
        </Typography>
        <Typography
          variant="p"
          component="p"
          color="textSecondary"
          style={{ marginBottom: "1em" }}
        >
          This is your current profile picture. 
        </Typography>
        <div className={classes.uploadWrapper}>
          {profilePicture !== null ?(
              <Avatar
            src={profilePicture}
            alt={`${user.first_name}
                ${user.last_name}`}
            className={classes.profilePicture}
          />
          ):(
            <div className={classes.profilePicture}>
                <CircularProgress size={100}/>
            </div>
          )}
          <UploadOneImage
            setCustomLoading={setLoading}
            urlSetter={uploadNewImage}
            noPreview={true}

          />
        </div>
      </div>}</>
    );
}