import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 325,
    minHeight: 250,
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0,
    }
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
  },
  img: {
    height: 140,
    backgroundPosition: ' 0 -7px',
    backgroundSize: 'cover', 

    width: '100%'
  }

}));

export default function ImgMediaCard({img, imgTitle, imgAlt, imgStyling, cardTitle, cardContent, buttonLink, buttonContent  }) {
  
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <div  title={imgTitle} alt={imgAlt}
          className={classes.img}
          style={{backgroundImage: `url(${img})`, ...imgStyling}}
        ></div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {cardTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cardContent}
          </Typography>
        </CardContent>
      { buttonLink && buttonContent && (
        <CardActions>
            <Button size="small" color="primary" href={buttonLink}>
            {buttonContent}
            </Button>
        </CardActions>
      )}
    </Card>
  );
}
