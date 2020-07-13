import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Box, Typography, Divider} from "@material-ui/core/";
import Card from './Card';
import remoteWork from '../vector-icons/green/remote-work.svg'
import selectingHome from '../vector-icons/green/many-homes.svg'
import directCommunication from '../vector-icons/green/conversation.svg'
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
          <Typography
            variant="h4"
            component="h3"
            className={classes.title}
            //   gutterBottom
          >
            For Renters
          </Typography>
          <Box className={classes.cardWrapper}>
            <Card
              img={remoteWork}
              imgAlt="woman working remotely vector art"
              imgTitle="Remote worker"
              cardTitle="Digital Nomad Friendly"
              cardContent="Flexible options perfect for digital nomads."
            />
            <Card
              img={selectingHome}
              imgAlt="many types of homes vector art"
              imgTitle="Selecting a home"
              imgStyling={{
                backgroundPostion: "bottom center",
                backgroundColor: "black",
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
          <Typography
            variant="h4"
            component="h3"
            className={classes.title}
            //   gutterBottom
          >
            For Owners
          </Typography>
          <Box className={classes.cardWrapper}>
            <Card
              img={remoteWork}
              imgAlt="woman working remotely vector art"
              imgTitle="remote work"
              cardTitle="Nomad Friendly"
              cardContent="Perfect for digital nomads on the go."
            />
            <Card
              img={remoteWork}
              imgAlt="woman working remotely vector art"
              imgTitle="remote work"
              cardTitle="Nomad Friendly"
              cardContent="Perfect for digital nomads on the go."
            />
            <Card
              img={remoteWork}
              imgAlt="woman working remotely vector art"
              imgTitle="remote work"
              cardTitle="Nomad Friendly"
              cardContent="Perfect for digital nomads on the go."
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ForUsers;
