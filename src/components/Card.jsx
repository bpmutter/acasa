import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";



export default function ImgMediaCard({img, imgTitle, imgAlt, imgStyling, cardTitle, cardContent, buttonLink, buttonContent  }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 325,
      height: 250,
      margin: "1em",
    },
    title: {
      fontFamily: theme.typography.special,
      color: theme.palette.primary.dark,
    },
    media: {backgroundColor: 'black'}
  }));
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
          component="img"
          alt={imgAlt}
          height="140"
          image={img}
          title={imgTitle}
        />
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
