import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ListingCard from './ListingCard';
import { v4 as uuid } from "uuid";

const useStyles = makeStyles(theme=>({
    root: {
        minHeight: '10vh'
    }
}))
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