import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import womanMountainHome from "../vector-icons/green/woman-with-home-mountain.svg";

const useStyles = makeStyles((theme) => ({
  hero: {
    display: "grid",
    gridTemplateColumns: "1.25fr 1fr",
    padding: "2em 5em 0",
    alignItems: "center",
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    zIndex: -1,
  },
  heroImg: {
    justifySelf: "center",
    maxWidth: 500,
  },
  button: {
    fontFamily: theme.typography.special,
  },
}));

const Hero = () => {
    const classes = useStyles();

    return (
      <>
        <Box className={classes.hero}>
          <Box>
            <Typography
              variant="h5"
              component="p"
              style={{ fontFamily: "inherit" }}
            >
              aCasa
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              style={{ fontFamily: "inherit" }}
            >
              Short & medium term furnished rentals
            </Typography>
            <p>
              For when it's longer than a vacation but you don't want to sign the lease.
            </p>
            <Button
              variant="contained"
              color="primary"
              href="#"
              className={classes.button}
            >
              Get Started
            </Button>
          </Box>
          <Box>
            <img
              className={classes.heroImg}
              src={womanMountainHome}
              alt="vector art of woman with mountain"
            />
          </Box>
        </Box>
        <Divider />
      </>
    );
}

export default Hero;