import React, {useContext} from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import context from './Context';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
    zIndex: 10,
    height: 65,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },


}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { loggedIn, logOut } = useContext(context);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClose = () => {
      logOut();
      handleClose();
  }

  return (<>  
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="open drawer"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon size="large"/>
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
          { loggedIn ? ( 
              <>
            <MenuItem onClick={handleClose} component={Link} to={"/profile"}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to={"/profile/settings"}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to={"/create-listing"}>
              Create Listing
            </MenuItem>
            <MenuItem onClick={handleLogoutClose}>
                Log Out
            </MenuItem>
            </>
          ):(<> 
            <MenuItem onClick={handleClose} component={Link} to={"/search"}>
              Search
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to={"/sign-up"}>
              Sign Up
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to={"/log-in"}>
              Log In
            </MenuItem>
          </>)}
            
          </Menu>
  </>);
}
