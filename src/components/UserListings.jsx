import React from 'react';
import ContentPaper from './ContentPaper';
import { Typography, makeStyles, Box } from '@material-ui/core';
import Listings from './Listings';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
  },
  wrapper: {
    padding: theme.spacing(2)
  },
}));
export default function UserListings({user, listings}){
    const classes = useStyles();

    return (
      <ContentPaper style={{ marginTop: "2rem", width: "100%" }}>
        <Box className={classes.wrapper}>
          <Typography variant="h4" component="h2" className={classes.title}>
            {user.first_name.endsWith("s")
              ? `${user.first_name}' `
              : `${user.first_name}'s `}
            Listings
          </Typography>
          <Box>
              <Listings listings={listings}/>
          </Box>
        </Box>
      </ContentPaper>
    );
}