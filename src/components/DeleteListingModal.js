import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles, Link, Typography, CircularProgress, Button as MuiButton} from "@material-ui/core";
import Button from './Button';
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import CloseIcon from "@material-ui/icons/Close";
import deleteListing from '../queries/listings/deleteListing';
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
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  deleteButton: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.special,
    color: red[500],
    cursor: "pointer",
    display: 'inline-flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(2)
  },
  progress: {
      display: 'flex',
      justifyContent: 'center',
  }
}));

export default function DeleteListingModal({listing}) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState({message: {}})
  const [mainContent, setMainContent] = useState("START")


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {

    await deleteListing(listing.id, setRes);
    setTimeout(()=>{
        history.push('/profile');
    }, 3000)
  }

  useEffect(()=>{
    if(res.message.type === "success"){

    }
  },[res.message])



  return (
    <>
      <MuiButton className={classes.deleteButton} onClick={handleOpen}>        
          <DeleteIcon />{"  "}Delete Listing
      </MuiButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="aCasa log in"
        aria-describedby="log into your aCasa account here"
        disableAutoFocus={true}
      >
        <div className={classes.modalContent}>
          <div>
            <CloseIcon onClick={handleClose} />
          </div>
          <Typography component="h4" variant="h4" align="center" className={classes.title} color="primary">
            Delete Listing
          </Typography>
          {mainContent === "START" && !res.message.type && (
            <div>
              <Typography>
                <b>Warning:</b> Deletion of listings is permanent, and once you
                click delete below, you won't be able to recover the listing.
              </Typography>
              <div className={classes.buttonWrapper}>
                <Button onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          )}
          {mainContent === "LOADING" && !res.message.type && (
            <div className={classes.progress}>
              <CircularProgress size={100} />
              <p>Deleting your listing...</p>
            </div>
          )}
          {res.message.type && (
            <div>
              <Typography>
                {res.message.content} You'll be redirected to your profile in a
                moment.
              </Typography>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
