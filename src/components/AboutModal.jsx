import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core";
import { Typography, IconButton, Link } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import WebIcon from "@material-ui/icons/Web";


const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    width: 450,
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  iconButton: {
    backgroundColor: "rgba(2,18,26, .075)",
    borderRadius: "50%",
    height: 50,
    width: 50,
    position: "fixed",
    bottom: 90,
    left: 15,
    zIndex: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(2,18,26, .25)",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    opacity: 0.95,
    fontSize: "2.25em",
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: `${theme.spacing(2)} 0`,
    width: "100%",
  },
  img: {
    maxWidth: 100,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  
  title: {
    color: theme.palette.primary.dark,
    fontFamily: theme.typography.special,
    marginBottom: theme.spacing(3),
  },
  aboutInfo: {
      fontSize: theme.typography.fontSize*1.25
  },
  contactIcon: {
      fontSize: theme.typography.fontSize*1.5,
      margin: theme.spacing(1),

  }
  
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AboutModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.contentWrapper}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <HelpIcon className={classes.icon} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-contact-info"
        aria-describedby="alert-dialog-ben-perlmutter-contact-information"
        className={classes.dialog}
      >
        <div className={classes.contentWrapper}>
          <div className={classes.imgWrapper}>
            <img
              className={classes.img}
              src={`/logo-big.webp`}
              alt="aCasa logo"
            />
          </div>
          <Typography
            id="ben-permutter-contact"
            align="center"
            component="h3"
            variant="h4"
            className={classes.title}
          >
            About aCasa
          </Typography>
          <div className={classes.aboutInfo}>
            <p>aCasa is a medium-term listing platform.</p>
            <p>
              Home seekers can browse homes based on location, view home info
              relevant to medium-term stays, and contact the owners to continue
              the conversation on other mediums.
            </p>
            <p>
              Homeowners can post, update, and delete listings. They also have a
              dedicated profile page that they can update and share to build
              their business.
            </p>
            <p>
              aCasa was made with a React frontend and a Firebase serverless
              backend. Learn more and view the source code on{" "}
              <Link href="https://github.com/bpmutter/acasa" target="_blank">
                Github
              </Link>
              .
            </p>

            <Typography color="textSecondary" align="center">
              {"Made with 💜 by "}
              Ben Perlmutter, {new Date().getFullYear()}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              className={classes.icons}
            >
              <Link
                color="inherit"
                href="https://ben.perlmutter.io/"
                target="_blank"
                rel="noopener"
              >
                <WebIcon className={classes.contactIcon} />
              </Link>
              <Link
                color="inherit"
                href="https://github.com/bpmutter"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon className={classes.contactIcon} />
              </Link>
              <Link
                color="inherit"
                href="https://twitter.com/bpmutter"
                target="_blank"
                rel="noopener"
              >
                <TwitterIcon className={classes.contactIcon} />
              </Link>
            </Typography>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
