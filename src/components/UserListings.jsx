import React, {useEffect, useState, useCallback} from 'react';
import ContentPaper from './ContentPaper';
import { Typography, makeStyles, Box, CircularProgress } from '@material-ui/core';
import Listings from './Listings';
import getUserListings from '../queries/listings/getListingsByHostUsername';

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
  },
  wrapper: {
    padding: theme.spacing(2)
  },
}));
export default function UserListings({user}){
    const classes = useStyles();
    const [listings, setListings] = useState([]);

    const getListings = useCallback(async ()=>{
      if(user.username){
        const userListings = await getUserListings(user.username);
        setListings(userListings);
      }
    }, [user.username])

    useEffect(()=>{
      getListings();
    },[getListings])

    return (
      <ContentPaper style={{ marginTop: "2rem", width: "100%" }}>
        {(!listings || !listings.length) ? ( <>
          { !listings ? <p style={{textAlign:'center'}}>{user.first_name} does not have any listings right now.</p> : (
            <div className={classes.progressWrapper}>
            <CircularProgress size={100}/>
          </div>
          ) }</>
          
        ):(
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
        )}
      </ContentPaper>
    );
}