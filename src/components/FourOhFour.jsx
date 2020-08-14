import React, {useContext} from 'react';
import {makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText, Link} from '@material-ui/core';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import context from './Context';
import fourOhFourImg from "../vector-icons/green/hiding-in-trees.svg";
import Head from './Head';
const useStyles = makeStyles(theme => ({
  pageWrapper: {
    width: "75vw",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
    },
  },
  subtitle: {
    fontSize: theme.typography.fontSize * 1.5,
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(2),
  },
  img: {
    maxWidth: 450,
    [theme.breakpoints.down("sm")]: { 
        width: '90%'
    }
  },    
}));

export default function FourOhFour(){
    const classes = useStyles();
    const {loggedIn} = useContext(context);

    return (
      <MainContentWrapper>  
        <Head
          title="404"
          description={"Requested resource not found"}
        />
        <ContentPaper className={classes.root}>
          <div className={classes.pageWrapper}>
            <div>
              <Typography component="p" variant="h4" className={classes.title}>
                Awwww, snap!
              </Typography>
              <Typography className={classes.subtitle}>
                We can't find the page you're looking for.
              </Typography>
              <Typography>
                <b>Error Code:</b> 404
              </Typography>
              <p>Here are some useful links to get you back on track:</p>
              <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link href="/" color="inherit">
                        Home
                      </Link>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link href="/explore" color="inherit">
                        Search
                      </Link>
                    }
                  />
                </ListItem>
                {loggedIn ? (
                  <ListItem>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href="/profile" color="inherit">
                          Profile
                        </Link>
                      }
                    />
                  </ListItem>
                ) : (
                  <>
                    <ListItem>
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Link href="/sign-up" color="inherit">
                            Sign Up
                          </Link>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Link href="/log-in" color="inherit">
                            Log In
                          </Link>
                        }
                      />
                    </ListItem>
                  </>
                )}
              </List>
            </div>
            <div className={classes.imgWrapper}>
              <img
                src={fourOhFourImg}
                alt="small creatures hiding in trees"
                className={classes.img}
              />
            </div>
          </div>
        </ContentPaper>
      </MainContentWrapper>
    );
}