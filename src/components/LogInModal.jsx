import React from "react";
import { makeStyles, Link, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import LogIn from "./LogIn";

const useStyles = makeStyles((theme) => ({
  modalContent: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    outlineColor: theme.palette.secondary.light,
  },
  buttonLink: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark
  },
}));

export default function LoginModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link>
        <Typography variant="h6" component="span" 
        className={classes.buttonLink}
        onClick={handleOpen}
        >
          Log In
        </Typography>
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="aCasa log in"
        aria-describedby="log into your aCasa account here"
        disableAutoFocus={true}
      >
        <div className={classes.modalContent}>
          <LogIn/>
        </div>
      </Modal>
    </>
  );
}
