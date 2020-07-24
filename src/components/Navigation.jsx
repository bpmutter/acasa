import React, { useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import logo from "../theme/logo-big.webp";
import SignUpModal from './SignUpModal';
import ProfileMenu from './ProfileMenu';
import appContext from './Context';
import LogInModal from "./LogInModal";
import MobileNavMenu from './MobileNavMenu';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    zIndex: 3,
  },
  appBar: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.special,
  },
  menuLink: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
  },
  logo: { width: 50 },
  title: {
    flexGrow: 1,
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
  },
  rightNav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileMenu: {
    fontSize: "1.5rem",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { loggedIn } = useContext(appContext)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            href="/"
          >
            <img src={logo} alt="aCasa logo" className={classes.logo} />
          </IconButton>
          <Typography variant="h4" component="h2" className={classes.title}>
            <Link href="/">aCasa</Link>
          </Typography>

          <div className={classes.rightNav}>
            {smallScreen ? (
              <MobileNavMenu />
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.menuButton}
                  href="/search"
                >
                  <SearchIcon style={{ paddingRight: 10 }} />
                  Discover Homes
                </Button>
                {loggedIn ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.menuButton}
                      href="/create-listing"
                    >
                      <AddIcon style={{ paddingRight: 10 }} />
                      Create Listing
                    </Button>
                    <ProfileMenu className={classes.profileMenu} />
                  </>
                ) : (
                  <>
                    <SignUpModal />
                    <LogInModal />
                  </>
                )}
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
