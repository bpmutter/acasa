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

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    width: '65%',
    
    backgroundColor: theme.palette.background.default,
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
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '100%'
  },
  hometype: {
    marginLeft: '1em',
  },
  searchButton: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
const SearchBar = () => {
    const classes = useStyles();
    const [currentLocation, setCurrentLocation] = useState();
    const [location, setLocation] = useState();
    const [homeType, setHomeType] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const search = e => {
      e.preventDefault();
      const query = {location, homeType, startDate, endDate};
      //TODO: create some stuff to process data and query DB with it....
      console.log(query);
    }
    const todayStr = format(Date.now(), "y-MM-d");
    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          Find Your Next Home
        </Typography>
        <form className={classes.form} onSubmit={search}>
          <IconButton>
            <MyLocationIcon />
          </IconButton>
          <GoogleMapsSearchBox formSetter={setLocation} required/>
          <DateSelector labelText="Start Date" formSetter={setStartDate} defaultValue={todayStr} required/>
          <SelectOption
            labelText="Home Type"
            formSetter={setHomeType}
            className={classes.hometype}
            options={hometypes}
          />
          {/* <DateSelector labelText="End Date" formSetter={setEndDate} /> */}
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
    );
}

export default SearchBar;