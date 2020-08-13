import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Link,
  Typography,
  CircularProgress,
  Button as MuiButton,
} from "@material-ui/core";
import Button from "./Button";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import CloseIcon from "@material-ui/icons/Close";
import deleteUser from "../queries/users/deleteUser";
import context from './Context';

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
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  deleteButton: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.special,
    color: red[500],
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
  },
  progress: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function DeleteAccountModal({ user, disabled }) {
  const classes = useStyles();
  const history = useHistory();
  const {logOut} = useContext(context);
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState({ message: {} });
  const [mainContent, setMainContent] = useState("START");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setMainContent("LOADING");
    await deleteUser(user, setRes);
    logOut();
    // setTimeout(() => {
    //   history.push("/");
    // }, 3000);
  };

 

  return (
    <>
      <MuiButton className={classes.deleteButton} onClick={handleOpen} disabled={disabled}>
        <DeleteIcon />
        {"  "}Delete Account
      </MuiButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete your aCasa account"
        aria-describedby="delete your aCasa account here"
        disableAutoFocus={true}
      >
        <div className={classes.modalContent}>
          <div>
            <CloseIcon onClick={handleClose} />
          </div>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            className={classes.title}
            color="primary"
          >
            Delete Account
          </Typography>
          {mainContent === "START" && !res.message.type && (
            <div>
              <Typography>
                <b>Warning:</b> Deletion of accounts is permanent. It will also delete all listings you've created.
                Once you click delete below, you won't be able to recover the listing.
              </Typography>
              <div className={classes.buttonWrapper}>
                <Button onClick={handleDelete}>Delete Account</Button>
              </div>
            </div>
          )}
          {mainContent === "LOADING" && !res.message.type && (
            <div className={classes.progress}>
              <CircularProgress size={100} />
              <p>Deleting your account...</p>
            </div>
          )}
          {res.message.type && (
            <div>
              <Typography>
                {res.message.content} You'll be redirected to the homepage in a
                moment.
              </Typography>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
