import React, {useState} from 'react';
import {Avatar, makeStyles, Typography} from '@material-ui/core';
import Button from './Button';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.special,
    marginBottom: theme.spacing(3),
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
    // [theme.breakpoints.down("sm")]: {
    //   width: 300,
    //   height: 300,
    // },
  },
}));

export default function UpdateProfilePicture(user){
    const classes = useStyles();
    const [profilePicture, setProfilePicture] = useState(user.profile_picture);

    const uploadNewImage = e => {
        return ;
    }

    return (
      <div className={classes.root}>
        <Typography
          component="h4"
          variant="h5"
          className={classes.title}
          color="primary"
        >
          Upload New Profile Picture
        </Typography>
        <div className={classes.uploadWrapper}>
          <Avatar
            src={profilePicture}
            alt={`${user.first_name}
                ${user.last_name}`}
            className={classes.profilePicture}
          />
          <Button onClick={uploadNewImage} className={classes.button}>
            <PhotoCameraIcon style={{marginRight: 10}}/> Upload
          </Button>
        </div>
      </div>
    );
}