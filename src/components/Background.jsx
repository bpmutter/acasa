import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({ 
  root: {
    position: 'fixed', 
    zIndex: -100,
    height: '100vh',
    width: '100vw',
  },
}));

const Background = ()=>{
    const classes = useStyles();
    return(
      <div className={classes.root}>
      </div>
    )
}

export default Background;