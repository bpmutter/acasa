import React from 'react';
import {Paper, makeStyles} from '@material-ui/core' ;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: "90vw",
    backgroundColor: theme.palette.background.default,
  },
}));

export default function ContentPaper({children, style}){

    const classes = useStyles()
    return(
        <Paper className={classes.root} style={style}>
            {children}
        </Paper>
    )
}