import React, {useState} from 'react';
import SearchBar from './SearchBar';
import {makeStyles, Typography, Link} from '@material-ui/core';
import queryString from "query-string";
import dateStringToObj from '../utils/dateStringToObj';
import MainContentWrapper from './MainContentWrapper';
import SearchResults from './SearchResults';
import locationSearch from "../vector-icons/green/location-search.svg";
import ContentPaper from './ContentPaper';
import Head from './Head';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  noQuery: {
    minWidth: "70vw",
    minHeight: "70vh",
  },
  searchImgWrapper: {
    display: "flex",
    width: "100%",
    JustifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  searchImg: {
    maxWidth: 300,
    display: "inline-block",
    margin: "0 auto",
  },
  demoSearch: {
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const demoSearch =
  "/search?lat=40.7127753&lng=-74.0059728&query=New%20York,%20NY,%20USA&startDate=&homeType=";

export default function SearchResultsPage(props){
    const classes = useStyles();
    const parsed = queryString.parse(window.location.search);

    const [query, setQuery] = useState({
        description: parsed.query,
        lat: parseFloat(parsed.lat),
        lng: parseFloat(parsed.lng),
        hometype: parsed.homeType,
        startDate: (parsed.homeType ? dateStringToObj(parsed.startDate) : ""),
        searchRadiusKm: parsed.searchRadius || 15,
    });
    const [rerender, setRerender] = useState(Date.now())

    const refreshResults = (queryObj) => {
        setQuery(queryObj);
        setRerender(Date.now());
    }
    return (
      <div>
          <Head
            title={query.description || ""}
          />

        <MainContentWrapper>
          <SearchBar setSearchResults={refreshResults} />
          {!query.description && (
            <ContentPaper>
              <div className={classes.noQuery}>
                <Typography
                  variant="h4"
                  className={classes.title}
                  align="center"
                >
                  Get searching!
                </Typography>
                <Typography align="center" className={classes.demoSearch}>
                  Don't know where to start? Try{" "}
                  <Link href={demoSearch}>New York, NY</Link>
                </Typography>
                <div className={classes.searchImgWrapper}>
                  <img
                    src={locationSearch}
                    alt={"woman looking at galaxy with phone vector art"}
                    className={classes.searchImg}
                  />
                </div>
              </div>
            </ContentPaper>
          )}
          {query.description && !!rerender && (
            <SearchResults
              locationDescription={query.description}
              lat={query.lat}
              lng={query.lng}
              searchRadiusKm={query.searchRadiusKm}
              startDate={query.startDate}
              hometype={query.hometype}
            />
          )}
        </MainContentWrapper>
      </div>
    );
}