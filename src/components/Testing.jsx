import React from 'react';
import {makeStyles} from '@material-ui/core';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import ContactModal from './ContactModal';
import ImageModal from './ImageModal';
import UploadManyImgs from './UploadManyImages';

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
          <UploadManyImgs />
          <img
            src="https://acasa-bd3af.appspot.com/listings/cfaad2d9-0beb-498b-b956-ba2ed56c326f-art-james-jean-feature.jpg?alt=media"
            alt="idk anymore"
          />
        </ContentPaper>
      </MainContentWrapper>
    );
}