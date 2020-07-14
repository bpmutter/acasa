import React from 'react';
import {Box, Typography, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    //add styles
    root: {
        backgroundColor: theme.palette.secondary.light,
        height: 60,
        padding: '0 2rem'
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    ghIcon: { 
        margin: '0 .25rem',
        position: 'relative',
        top: -3,
        color: theme.palette.primary.light
    }
}))

const Footer = () =>{
    const classes = useStyles();

    return (
      <Box className={classes.root}>
        <Box className={classes.contact}>
          <IconButton
            href="https://github.com/bpmutter/acasa"
            target="_blank"
            className={classes.ghIcon}
          >
            <GitHubIcon />
          </IconButton>
          <Typography>
            Made by{" "}
            <Link href="https://ben.perlmutter.io" target="_blank">
              Ben Perlmutter
            </Link>
          </Typography>
        </Box>
      </Box>
    );
}

export default Footer;