import React from 'react';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: { 
        fontFamily: theme.typography.special,

    }
}))

export default function ThemeButton({children, ...props}){
    const classes = useStyles();
    return (
      <Button
        {...props}
        className={classes.button}
        variant="contained"
        color="primary"
        component="span"
      >
        {children}
      </Button>
    );
}