import React, { useState } from 'react';
import {Paper, makeStyles, Typography, IconButton} from '@material-ui/core';
import GoogleMapsSearchBox from './GoogleMapsSearchBox';
import SelectOption from './SelectOption';
import DateSelector from './DateSelector';
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import hometypes from "../searchtypes.json";
import format from "date-fns/format";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    width: "65%",
    backgroundColor: theme.palette.background.white,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "rgba(255,255,255,.7)",
      width: "100%",
      paddingBottom: theme.spacing(5),
    },
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(1.5),
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
  },
  dateSelect: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(1.5),
    },
  },
  hometype: {
    marginLeft: "1em",
  },
  searchButton: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
      width: 150,
    },
  },
}));
const SearchBar = ({setSearch}) => {
    const classes = useStyles();
    const [currentLocation, setCurrentLocation] = useState();
    const [location, setLocation] = useState();
    const [homeType, setHomeType] = useState();
    const [startDate, setStartDate] = useState();
    const [results, setResults] = useState([]);
    const [searchRedirect, setSearchRedirect] = useState(false);
    const search = async (e) => {
      e.preventDefault();
      const query = {location, homeType, startDate};
      //TODO: create some stuff to process data and query DB with it....
      setSearchRedirect(true);
      if(setSearch){
        setSearch({
          homeType,
          startDate,
          description: location.description,
          lat: location.geometry.location.lat,
          lng: location.geometry.location.lng,
        });
      }
      


    }
    const todayStr = format(Date.now(), "y-MM-d");
    return (<>
      {searchRedirect &&(
        <Redirect to={`/search?lat=${location.geometry.location.lat}&lng=${location.geometry.location.lng}&query=${location.description}&startDate=${startDate || "" }&homeType=${homeType || "" }`} />
      )}
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          Find Your Next Home
        </Typography>
        <form className={classes.form} onSubmit={search}>
          <IconButton>
            <MyLocationIcon />
          </IconButton>
          <GoogleMapsSearchBox formSetter={setLocation} required />
          <span className={classes.dateSelect}>
            <DateSelector
              labelText="Start Date"
              formSetter={setStartDate}
              defaultValue={todayStr}
              required
            />
          </span>
          <SelectOption
            labelText="Home Type"
            formSetter={setHomeType}
            className={classes.hometype}
            options={hometypes}
          />
          <Button
            className={classes.searchButton}
            variant="contained"
            color="primary"
            href="#"
            onClick={search}
          >
            <SearchIcon />
          </Button>
        </form>
      </Paper>
    </>);
}

export default SearchBar;