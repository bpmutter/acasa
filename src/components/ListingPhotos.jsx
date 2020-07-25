import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Modal, Fade} from '@material-ui/core';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ContentPaper from "./ContentPaper";
import ImageModal from './ImageModal';

const useStyles = makeStyles((theme) => ({
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridImg: {
      cursor: 'pointer',
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
  primaryImgWrapper: {
    "&:hover": {
      position: "relative",
      zIndex: 400,
      transform: "scale(1.05)",
    },
  },
  primaryImg: {
    width: 500,
    height: 300,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: '/assets/loading-spinner.gif',
    [theme.breakpoints.down("sm")]: { 
      width: 300,
    }
  },
  spacing: {
    margin: theme.spacing(1),
  },
}));

function SingleLineGridList({imgs, listingTitle}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalSrc,  setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleOpen = (e) => {
    setOpen(true);
    setModalSrc(e.target.src)
    setModalAlt(e.target.alt)
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.gridListRoot}>
      <GridList className={classes.gridList} cols={2.5}>
        {imgs.map((src, i) => (
          <GridListTile key={src}>
            <img
              src={src}
              alt={`${listingTitle} img ${i + 1}`}
              onClick={handleOpen}
              className={classes.gridImg}
            />
          </GridListTile>
        ))}
      </GridList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        TransitionComponent={Fade}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
            <div className={classes.modalFrame}>
            <img src={modalSrc} alt={modalAlt} className={classes.imgModal}></img>
            </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default function ListingPhotos({primaryImg, additionalImgs, title, ...props}) {
    const classes = useStyles();
    return (
      <section {...props}>
        <Paper className={classes.primaryImgWrapper}
        style={{marginBottom: '1em', maxWidth:500, margin: '0 auto', padding: '.5em'}}>
          {/* <div
            className={classes.primaryImg}
            style={{ backgroundImage: `url(${primaryImg})` }}
          ></div> */}
          <ImageModal
              src={primaryImg}
              alt={title}
              className={classes.primaryImg}
          />
        </Paper>
        <div className={classes.spacing}>
        </div>
        {additionalImgs && !!additionalImgs.length && (
          <ContentPaper>
            <SingleLineGridList imgs={additionalImgs} title={title} />
          </ContentPaper>
        )}
      </section>
    );
}