import React from 'react';
import {makeStyles, Paper, Typography} from '@material-ui/core';
import ContactModal from './ContactModal';
import HeartButton from './HeartButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "sticky",
    minHeight: 100,
    marginTop: theme.spacing(1),
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  mainContent: {
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(1),
  },
  actionButtons: {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  contactButton: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
}));
export default function ListingHeader({listing}){

    const classes = useStyles();
    return (
      <>
        <div className={classes.root}>
          <Paper className={classes.mainContent} component="div" >
            <div className={classes.info}>
              <Typography component="p" variant="p" color="textSecondary">
                {listing.location.description}
              </Typography>
              <Typography component="h1" variant="h4" className={classes.title}>
                {listing.title}
              </Typography>
              <Typography component="p" variant="h5">
                ${listing.price}/mo
              </Typography>
            </div>
            <div className={classes.actionButtons}>
                <ContactModal username={listing.owner.username} noName={true} />
              <span className={classes.contactButton}>
                <HeartButton />
              </span>
            </div>
          </Paper>
        </div>
      </>
    );
}