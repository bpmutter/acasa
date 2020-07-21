import React, {useState} from 'react';
import {Modal, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  img: {
    height: '100%',
    width: '100%',
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // backgroundColor: "pink",
    cursor: "pointer",
  },
  modalFrame: {
    display: "inline-block",
    outlineColor: theme.palette.secondary.light,
    backgroundColor: "white",
  },
  imgModal: {
    maxHeight: 600,
    maxWidth: 900,
  },
}));


export default function ImageModal({ src, alt, component, className }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  if(component === 'img'){
      return (<>
        <img src={src} alt={alt}/>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={classes.modalFrame}>
              <img src={src} alt={alt} className={classes.imgModal}></img>
            </div>
        </Modal>
      </>);
  }

  return (
    <div className={classes.imgWrapper}>
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
            <img src={src} alt={alt} className={classes.imgModal}></img>
        </div>
      </Modal>
    </div>
  );
}

