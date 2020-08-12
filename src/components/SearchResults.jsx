import React, {useState, useEffect} from 'react';
import ContentPaper from './ContentPaper';
import {makeStyles, Typography, Divider, CircularProgress, Link} from '@material-ui/core';
import getNearbyListings from '../queries/listings/getNearbyListings';
import emptyVoid from "../vector-icons/green/empty-void.svg";
import Listings from './Listings';
 import dateFormatter from '../utils/dateFormatter';
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  searchResultsWrapper: {
    minWidth: "70vw",
  },
  sectionDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  resultsWrapper: {
    minHeight: "60vh",
  },
  progressWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  noResultsImgWrapper: {
    display: "flex",
    width: "100%",
    JustifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  noResultsImg: {
    maxWidth: 300,
    display: "inline-block",
    margin: "0 auto",
  },
  demoSearch: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const demoSearch =
  "/search?lat=40.7127753&lng=-74.0059728&query=New%20York,%20NY,%20USA&startDate=&homeType=";

export default function SearchResults({locationDescription, lat, lng, hometype, startDate, searchRadiusKm}){
    const classes = useStyles();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetListings = async () => {
        const res = await getNearbyListings(lat, lng, searchRadiusKm, hometype, startDate);
        setListings(res.results);
        setLoading(false);
    }
    useEffect(()=>{
        if(locationDescription) (async () => getAndSetListings())()
    }, [locationDescription])

    return (
      <div>
        <ContentPaper>
          <div className={classes.searchResultsWrapper}>
            <Typography component="h1" variant="h4" className={classes.title}>
              Search results for: {locationDescription}
            </Typography>
            {startDate && (
              <Typography>
                <b>Start Date: </b>
                {dateFormatter(startDate)}
              </Typography>
            )}
            {hometype && (
              <Typography>
                <b>Home type: </b>
                {hometype}
              </Typography>
            )}
            <Divider className={classes.sectionDivider} />
            <section className={classes.resultsWrapper}>
              {loading && (
                <div className={classes.progressWrapper}>
                  <CircularProgress size={100} color="primary" />
                </div>
              )}
              {!loading ? (
                !!listings.length ? (
                  <Listings listings={listings} />
                ) : (
                  <div>
                    <Typography
                      component="p"
                      variant="h5"
                      className={classes.title}
                      align="center"
                    >
                      We got nothing.
                    </Typography>
                    <Typography color="textSecondary" align="center">
                      No listings match your search parameters. Please try
                      another search.
                    </Typography>
                    <Typography align="center" className={classes.demoSearch}>
                      Don't know where to start? Try{" "}
                      <Link href={demoSearch}>New York, NY</Link>
                    </Typography>
                    <div className={classes.noResultsImgWrapper}>
                      <img
                        src={emptyVoid}
                        alt={"man staring into an empty void"}
                        className={classes.noResultsImg}
                      />
                    </div>
                  </div>
                )
              ) : null}
            </section>
          </div>
        </ContentPaper>
      </div>
    );
}