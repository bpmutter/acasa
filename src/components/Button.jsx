import React from 'react';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: { 
        fontFamily: theme.typography.special,
        padding: theme.spacing(2),
        maxHeight: 50,
        textAlign: 'center'
    }
}))

export default function ThemeButton({children, color, ...props}){
    const classes = useStyles();
    return (
      <Button
        {...props}
        className={classes.button}
        variant="contained"
        color={color || "primary"}
        component="div"
      >
        {children}
      </Button>
    );
}