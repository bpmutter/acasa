import React, { useState } from 'react';
import {Paper, makeStyles, Typography} from '@material-ui/core';
import GoogleMapsSearchBox from './GoogleMapsSearchBox';
import SelectOption from './SelectOption';
import DateSelector from './DateSelector';
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: "90vw",
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(.5),
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: 'wrap',
    width: '100%'
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
    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          Find Your Next Home
        </Typography>
        <form className={classes.form} onSubmit={search}>
          <GoogleMapsSearchBox formSetter={setLocation} />
          <SelectOption labelText="Home Type" formSetter={setHomeType} />
          <DateSelector labelText="Start Date" formSetter={setStartDate} />
          <DateSelector labelText="End Date" formSetter={setEndDate} />
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