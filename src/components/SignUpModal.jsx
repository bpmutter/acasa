import React from "react";
import { makeStyles, Link, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";


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
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark
  },
}));

export default function MyModal() {
  const classes = useStyles();
//   const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link href="#">
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
        aria-labelledby="aCasa sign in"
        aria-describedby="sign in to aCasa here"
        disableAutoFocus={true}
        // className={classes.modal}
      >
        <div className={classes.modalContent}>
          <Typography 
            id="log-in-title" 
            className={classes.title}
            variant="h4"
            component="h3"
          >
            Log In
          </Typography>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
    </>
  );
}
