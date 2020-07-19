import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import womanMountainHome from "../vector-icons/green/woman-with-home-mountain.svg";

const useStyles = makeStyles((theme) => ({
  hero: {
    display: "grid",
    gridTemplateColumns: "1.25fr 1fr",
    padding: "6em 5em 0",
    alignItems: "center",
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(20),
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column-reverse",
      paddingTop: theme.spacing(12),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(6),
      width: '100%'
    },
  },
  heroImg: {
    // justifySelf: "center",
    width: 500,
    opacity: 0.8,
    height: 300,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(5),
      height: 250,
      width: 'auto'
    },

    [theme.breakpoints.down("sm")]: {
      width: 300,
      // paddingBottom: theme.spacing(10),
    },
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
              Medium-term furnished rentals
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
          <div className={classes.heroImg} style={{backgroundImage: `url(${womanMountainHome})`}}>
            {/* <img
              className={classes.heroImg}
              src={womanMountainHome}
              alt="vector art of woman with mountain"
            /> */}
          </div>
        </Box>
        <Divider />
      </>
    );
}

export default Hero;