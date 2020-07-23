import React, {useState} from 'react';
import SearchBar from './SearchBar';
import {makeStyles, Typography} from '@material-ui/core';
import queryString from "query-string";
import dateStringToObj from '../utils/dateStringToObj';
import MainContentWrapper from './MainContentWrapper';
import SearchResults from './SearchResults';
import locationSearch from "../vector-icons/green/location-search.svg";
import ContentPaper from './ContentPaper';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  noQuery: {
    minWidth: "70vw",
    minHeight: '70vh'
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
}));
export default function SearchResultsPage(props){
    const classes = useStyles();
    const parsed = queryString.parse(window.location.search);

    const [query, setQuery] = useState({
        description: parsed.query,
        lat: parseFloat(parsed.lat),
        lng: parseFloat(parsed.lng),
        homeType: parsed.homeType,
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
        <MainContentWrapper>
          <SearchBar setSearch={refreshResults}/>
          {!query.description && (
            <ContentPaper>
              <div className={classes.noQuery}>
                <Typography variant="h4" className={classes.title} align="center">
                    Get searching!
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
          {query.description  && !!rerender && (
            <SearchResults
              locationDescription={query.description}
              lat={query.lat}
              lng={query.lng}
              searchRadiusKm={query.searchRadiusKm}
            />
          )}
        </MainContentWrapper>
      </div>
    );
}