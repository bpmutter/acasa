import React from 'react';
import ContentPaper from './ContentPaper';
import {makeStyles, Box, Avatar, Typography, Button} from '@material-ui/core';
import {format} from 'date-fns'
import dateFormatter from '../utils.js/dateFormatter';
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    padding: theme.spacing(2),
  },
  profilePicture: {
    width: 325,
    height: 325,
  },
  mainProfileContent: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    width: '100%'
  },
  primaryInfoWrapper: { 
    display: 'flex', justifyContent: 'space-between', width: '100%'
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(1.5),
  },
  joinDate: {
    fontSize: "1.25rem",
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
    display: 'inline-block',
    position: 'static',
    height: 40,
  },
}));

export default function UserProfileInfo({user}){
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
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Contact Me! 
              </Button>
            </Box>

            <Box className={classes.secondaryInfoWrapper}>
              {user.location && user.location.city && user.location.country && (
                <Typography
                  variant="p"
                  component="p"
                  color="textPrimary"
                  className={classes.secondaryInfo}
                >
                  <span className={classes.bold}>Location:</span>{" "}
                  {user.location.city}, {user.location.country}
                </Typography>
              )}
              { user.languages && user.languages.length && (
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
          </Box>
        </Box>
      </ContentPaper>
    );
}