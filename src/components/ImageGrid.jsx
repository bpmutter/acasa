import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Fade } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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

export default function SingleLineGridList({ imgs }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const handleOpen = (e) => {
    setOpen(true);
    setModalSrc(e.target.src);
    setModalAlt(e.target.alt);
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
              alt={src}
              onClick={handleOpen}
              className={classes.gridImg}
            />
          </GridListTile>
        ))}
      </GridList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="additional image preview"
        aria-describedby="additional image preview"
        TransitionComponent={Fade}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <div className={classes.modalFrame}>
            <img
              src={modalSrc}
              alt={modalAlt}
              className={classes.imgModal}
            ></img>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
