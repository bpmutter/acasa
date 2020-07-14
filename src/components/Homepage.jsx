import React from 'react';
// import { } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hero from './Hero';
import ForUsers from './ForUsers';
import SearchBar from './SearchBar';
import MainContentWrapper from './MainContentWrapper';

const useStyles = makeStyles((theme) => ({
  main: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    width: '100%',
  }
}));

const Homepage = () => {
    const classes = useStyles();

    return (
      <>
        <Hero />
        <MainContentWrapper>
          <SearchBar />
          <ForUsers />
        </MainContentWrapper>
      </>
    );
}

export default Homepage;
