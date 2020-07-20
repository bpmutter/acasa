import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ListingCard from './ListingCard';
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "10vh",
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
}));
export default function Listings({listings}){
    const classes = useStyles();
    return(
        <Box className={classes.root}>
            {listings && listings.length ?(
                <>
                    {listings.map(listing => <ListingCard key={uuid()} listing={listing}/>)}
                </>
            ):(
                <p>No listings yet!</p>
            ) }
        </Box>
        
    )
}