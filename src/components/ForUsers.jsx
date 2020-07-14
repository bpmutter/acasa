import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Box, Typography, Divider} from "@material-ui/core/";
import Card from './Card';
import remoteWork from '../vector-icons/green/remote-work.svg'
import selectingHome from '../vector-icons/green/many-homes.svg'
import directCommunication from '../vector-icons/green/conversation.svg'
import shareNews from '../vector-icons/green/news-megaphone.svg'
import controlSettings from '../vector-icons/green/control-settings.svg'
import payment from '../vector-icons/green/transfer-money.svg'
const useStyles = makeStyles((theme) => ({
  container: {
    margin: " 2rem auto",
    padding: "1em",
    maxWidth: "90vw",
    backgroundColor: theme.palette.background.default,
  },
  sectionWrapper: {
    padding: "1em",
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: "1rem",
    flexWrap: 'wrap'
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
  },
}));

const ForUsers = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.container}>
        <Box className={classes.sectionWrapper}>
          <Typography variant="h4" component="h3" className={classes.title}>
            For Renters
          </Typography>
          <Box className={classes.cardWrapper}>
            <Card
              img={remoteWork}
              imgAlt="woman working remotely vector art"
              imgTitle="Remote worker"
              cardTitle="Digital Nomad Friendly"
              cardContent="Flexible options and relevant info perfect for digital nomads."
            />
            <Card
              img={selectingHome}
              imgAlt="many types of homes vector art"
              imgTitle="Selecting a home"
              imgStyling={{
                backgroundPosition: "bottom center",
              }}
              cardTitle="Diverse Selection"
              cardContent="A broad selection of housing options all around the world."
            />
            <Card
              img={directCommunication}
              imgAlt="two people talking vector art"
              imgTitle="Direct communication with owner"
              cardTitle="Direct Communication"
              cardContent="Coordinate directly with property owner to accommodate your unique situation."
            />
          </Box>
        </Box>
        <Divider />
        <Box className={classes.sectionWrapper}>
          <Typography variant="h4" component="h3" className={classes.title}>
            For Owners
          </Typography>
          <Box className={classes.cardWrapper}>
            <Card
              img={shareNews}
              imgAlt="man standing out from crowd vector art"
              imgTitle="Make your listings stand out"
              cardTitle="Exposure"
              cardContent="Get views on aCasa and your listings everywhere for maximum exposure."
              imgStyling={{ backgroundPosition: "0 15px ", backgroundRepeat: 'no-repeat' }}
            />
            <Card
              img={controlSettings}
              imgAlt="woman controlling settings vector art"
              imgTitle="Control the experience"
              cardTitle="Full Control"
              cardContent="Once we connect you with the prospect, you control the whole process."
              imgStyling={{ backgroundPosition: "0 -25px " }}
            />
            <Card
              img={payment}
              imgAlt="two people exchanging money vector are"
              imgTitle="Exchanging payment"
              cardTitle="Your Payment Process"
              cardContent="You decide the payment process and we take NO FEES."
              imgStyling={{ backgroundPosition: "0 -35px " }}
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ForUsers;
