import React from 'react';
import {makeStyles} from '@material-ui/core';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import ContactModal from './ContactModal';

const useStyles = makeStyles((theme) => ({
  light: {
    backgroundColor: theme.palette.primary.light,
  },
  main: {
    backgroundColor: theme.palette.primary.main,
  },
  dark: {
    backgroundColor: theme.palette.primary.dark,
  },
}));
export default function Testing(){
  const classes = useStyles();
    const demoUser = {
      first_name: "Ben",
      last_name: "Perlmutter",
      profile_picture:
        "https://lh3.googleusercontent.com/a-/AOh14Gg9WbJE0awcv_EPhlqHyIMSTqLbvbSdjzmXOunEcQ",
      contact: {
        email: "ben@perlmutter.io",
        whatsapp: "+1 (914) 589-5304",
        phone: "+1 (914) 589-5304",
        website: "ben.perlmutter.io",
      },
    };
    return (
      <MainContentWrapper>
        <ContentPaper style={{ padding: "3em", width: 800, minHeight: 500 }}>
          
          <ContactModal userToContact={demoUser}/>
  
        </ContentPaper>
      </MainContentWrapper>
    );
}