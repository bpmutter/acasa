import React from 'react';
import ContentPaper from './ContentPaper';
import {makeStyles, Box, Avatar, Typography, Button, CircularProgress} from '@material-ui/core';
import {format} from 'date-fns'
import dateFormatter from '../utils/dateFormatter';
import SettingsIcon from "@material-ui/icons/Settings";
import ContactModal from './ContactModal';
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  settingsButton: {
    position: "absolute",
  },
  profilePicture: {
    width: 325,
    height: 325,
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: 300,
    },
  },
  mainProfileContent: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: 250,
  },
  progress: {
    alignSelf: "center",
    justifySelf: "center",
    margin: theme.spacing(10),
  },
  primaryInfoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(1.5),
  },
  joinDate: {
    fontSize: "1.25rem",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(1.5),
    },
  },
  bold: {
    fontWeight: "bold",
  },
  secondaryInfo: {
    paddingBottom: theme.spacing(2),
    fontSize: "1.25rem",
  },
  button: {
    fontFamily: theme.typography.special,
    display: "inline-flex",
    alignItems: "center",
    position: "static",
    height: 40,
    minWidth: 80,
    padding: theme.spacing(2)
  },
}));

export default function UserProfileInfo({user, profile, username}){
    const classes = useStyles();

    return (
      <ContentPaper style={{ width: "100%" }}>
        <Box className={classes.wrapper}>
          <Avatar
            src={user.profile_picture}
            alt={`${user.first_name}
                ${user.last_name}`}
            className={classes.profilePicture}
          />
          <Box className={classes.mainProfileContent}>
            {!user.username ? ( 
              <CircularProgress className={classes.progress} size={100}/>
            ):(  
              <>
              <Box className={classes.primaryInfoWrapper}>
                <Box>
                  <Typography
                    variant="p"
                    component="p"
                    color="textSecondary"
                    className={classes.joinDate}
                  >
                    Joined {user.joined}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="h1"
                    className={classes.title}
                  >
                    {user.first_name} {user.last_name}
                  </Typography>
                </Box>
                { profile ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href={"/profile/settings"}
                  >
                    <SettingsIcon style={{paddingRight: '.25em'}}/> Settings 
                  </Button>
                ) : (
                  <ContactModal userToContact={user} username={username}/> 
                )}
              </Box>

              <Box className={classes.secondaryInfoWrapper}>
                {user.location && user.location.description && (
                  <Typography
                    variant="p"
                    component="p"
                    color="textPrimary"
                    className={classes.secondaryInfo}
                  >
                    <span className={classes.bold}>Location:</span>{" "}
                    {user.location.description}
                  </Typography>
                )}
                {!!user.languages && !!user.languages.length && (
                  <Typography
                    variant="p"
                    component="p"
                    color="textPrimary"
                    className={classes.secondaryInfo}
                  >
                    <span className={classes.bold}>Languages:</span>{" "}
                    {user.languages.join(", ")}
                  </Typography>
                )}
                {user.bio && (
                  <Typography
                    variant="p"
                    component="p"
                    color="textPrimary"
                    className={classes.secondaryInfo}
                  >
                    <span
                      className={classes.bold}
                      style={{ display: "block", marginBottom: ".25em" }}
                    >
                      About {user.first_name}:
                    </span>
                    {user.bio}
                  </Typography>
                )}
              </Box>
              </>
            )}
          </Box> 
        </Box>
      </ContentPaper>
    );
}