import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
const MainContentWrapper = ({children})=>{
    const classes = useStyles();
    return (
        <main className={classes.main}>
            {children}
        </main>
    )

}

export default MainContentWrapper;