import React, {useState} from 'react';
import {makeStyles, IconButton} from '@material-ui/core';
import pink from "@material-ui/core/colors/pink";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
const useStyles = makeStyles((theme) => ({
  heartButton: {
    color: pink[500],
  },
}));

export default function HeartButton(props){
    const classes = useStyles();
    const [hearted, setHearted] = useState(false);

    const toggleFavorite = () => {
      setHearted(!hearted);
    };

    return (
      <div {...props}>
        <IconButton onClick={toggleFavorite}>
          {hearted ? (
            <FavoriteIcon className={classes.heartButton} />
          ) : (
            <FavoriteBorderIcon className={classes.heartButton} />
          )}
        </IconButton>
      </div>
    );
}
