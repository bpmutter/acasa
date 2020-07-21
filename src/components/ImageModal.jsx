import React, {useState} from 'react';
import {Modal, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  img: {
    height: 120,
    width: 120,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "pink",
    cursor: 'pointer',
    '&:hover': {
        position: 'relative',
        transform: 'scale(1.1)', 
    }
  },
  modalFrame: {
    display: "inline-block",
    outlineColor: theme.palette.secondary.light,
    backgroundColor: 'white',
  },
}));


export default function ImageModal({ src, alt, className }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  


  return (
    <div>
      <div
        className={className ? `${classes.img} ${className}` : classes.img}
        style={{ backgroundImage: `url(${src})` }}
        onClick={handleOpen}
      ></div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <div className={classes.modalFrame}>
            <img src={src} alt='homer'></img>
        </div>
      </Modal>
    </div>
  );
}

