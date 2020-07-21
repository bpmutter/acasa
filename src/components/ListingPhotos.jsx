import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ContentPaper from "./ContentPaper";


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
  primaryImg: {
    width: 500,
    height: 300,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(5),
      height: 250,
      width: "auto",
    },

    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },
  spacing: {
      margin: theme.spacing(1)
  }
}));

function SingleLineGridList({imgs, listingTitle}) {
  const classes = useStyles();
  console.log('imgs are::',imgs)
  return (
    <div className={classes.gridListRoot}>
      <GridList className={classes.gridList} cols={3.5}>
        {imgs.map((imgLink, i) => (
          <GridListTile key={imgLink}>
            <img src={imgLink} alt={`${listingTitle} img ${i + 1}`} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


export default function ListingPhotos({primaryImg, additionalImgs, title, ...props}) {
    const classes = useStyles();
    return (
      <section {...props}>
        <ContentPaper style={{marginBottom: '1em', maxWidth:500, margin: '0 auto'}}>
          <div
            className={classes.primaryImg}
            style={{ backgroundImage: `url(${primaryImg})` }}
          ></div>
        </ContentPaper>
        <div className={classes.spacing}>
        </div>
        {additionalImgs && additionalImgs.length && (
          <ContentPaper>
            <SingleLineGridList imgs={additionalImgs} title={title} />
          </ContentPaper>
        )}
      </section>
    );
}