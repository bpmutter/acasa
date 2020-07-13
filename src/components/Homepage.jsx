import React from 'react';
// import { } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hero from './Hero';
import ForUsers from './ForUsers';

const useStyles = makeStyles((theme) => ({
  hero: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    margin: "0 5em",
    paddingTop: '2em',
    alignItems: "center",
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
  },
  heroImg: {
    justifySelf: "center",
    maxWidth: 500,
  },
  button: {
    fontFamily: theme.typography.special,
  },
}));

const Homepage = () => {
    const classes = useStyles();

    return (
      <>
        <Hero/>
        <ForUsers/>
      </>
    );
}

export default Homepage;
