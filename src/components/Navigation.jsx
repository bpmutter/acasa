import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../theme/logo-big.webp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.special,
    // color: theme.palette.primary.main,
  },
  logo: { width: 50 },
  title: {
    flexGrow: 1,
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} alt="aCasa logo" className={classes.logo} />
          </IconButton>
          <Typography variant="h4" component="h2" className={classes.title}>
            aCasa
          </Typography>

          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
            >
              Post a Home
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
