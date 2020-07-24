import React, {useState, useContext} from 'react';
import {Paper, Box, makeStyles, Typography, IconButton, Link, Chip, Avatar} from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotelIcon from "@material-ui/icons/Hotel";
import GroupIcon from "@material-ui/icons/Group";
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import ContactModal from './ContactModal';
import context from './Context';
import Button from './Button'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    minHeight: 250,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  img: {
    backgroundPosition: "center",
    //TODO: add a better default img
    backgroundImage: `url(https://r-cf.bstatic.com/images/hotel/max1024x768/365/36548015.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: 225,
    minWidth: 350,
    maxWidth: 400,
    display: "inline-block",
    borderRight: `1px solid #fafafa`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
    },
  },
  mainContent: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    width: "95%",
    minHeight: 225,
    [theme.breakpoints.down("sm")]: { 
      paddingTop: theme.spacing(2),
    },
  },
  topContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    },
  },
  heartButton: {
    color: pink[500],
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      marginRight: theme.spacing(1),

      alignSelf: 'flex-start'
    },
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "space-between",
    paddingRight: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      // alignItems: 'flex-start',
    },
  },
  price: {
    minWidth: 150,
    textAlign: "center",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      alignSelf: "flex-end",
      textAlign: 'right',
      marginRight: theme.spacing(.5),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  chips: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0.25),
    },
  },
  owner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  ownerInfo: {
    display: "inline-flex",
    justifyContent: "left",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
      paddingRight: theme.spacing(2.5),
      paddingBottom: theme.spacing(1.5)
    },
  },
  contactButton: {
    marginTop: theme.spacing(2),
    alignSelf: "center",
    justifySelf: 'center',
    // paddingRight: theme.spacing(3),
  },
}));

export default function ListingCard({listing}){
    const classes = useStyles();
    const {user: {uid}} = useContext(context);
    
    const [hearted, setHearted] = useState(false);
    const overview = listing.roommates ? `Room in shared ${listing.type}` : `Whole ${listing.type}`

    const toggleFavorite = () => {
        setHearted(!hearted);
    }
    const triggerModal = () => {
        //TODO add modal for contacting host 
    }
    return (
      <Paper className={classes.root} elevation={2}>
        <div
          className={classes.img}
          style={{ backgroundImage: `url(${listing.primary_img})` }}
        ></div>
        <Box className={classes.mainContent}>
          <Box className={classes.topContent}>
            <Typography variant="p" component="p" color="textSecondary">
              {overview}
              {" • "}
              {listing.location.description}
            </Typography>
            <IconButton
              className={classes.heartButton}
              onClick={toggleFavorite}
            >
              {/* {hearted ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
            </IconButton>
          </Box>
          <Typography variant="h4" component="h3" className={classes.title}>
            <Link href={`/listings/${listing.id}`}>{listing.title}</Link>
            <Typography variant="h4" component="p" className={classes.price}>
              {`$${listing.price}/mo`}
            </Typography>
          </Typography>
          <Box className={classes.chips}>
            <Chip
              icon={<HotelIcon />}
              label={`${listing.bedrooms} bedroom`}
              className={classes.chip}
            />
            <Chip
              icon={<GroupIcon />}
              label={
                listing.max_guests > 1
                  ? `${listing.max_guests} guests`
                  : `${listing.max_guests} guest`
              }
              className={classes.chip}
            />
            <Chip
              icon={<BathtubIcon />}
              label={`${listing.max_guests} bath`}
              className={classes.chip}
            />
            {listing.wifi_speed && (
              <Chip
                icon={<WifiIcon />}
                label={`${listing.wifi_speed} mb/s`}
                className={classes.chip}
              />
            )}
            {listing.lgbtq && (
              <Chip label="🏳️‍🌈 LGBTQ+ friendly" className={classes.chip} />
            )}
          </Box>
          <div className={classes.owner}>
            <div className={classes.ownerInfo}>
              <Avatar
                src={listing.owner.profile_picture}
                alt={`${listing.owner.first_name} ${listing.owner.last_name}`}
                style={{ marginRight: 5, display: "inline-block" }}
              />
              Listing by{" "}
              <Link
                href={`/users/${listing.owner.username}`}
                style={{ marginLeft: 5 }}
              >
                {`${listing.owner.first_name} ${listing.owner.last_name}`}
              </Link>
            </div>
            {listing.owner.uid !== uid ? (
              <ContactModal
                username={listing.owner.username}
                className={classes.contactButton}
              />
            ) : (
              <Link href={`/listings/${listing.id}/edit`}>
                <Button href={`/listings/${listing.id}/edit`}>
                  Edit Listing
                </Button>
              </Link>
            )}
            {/* {<ContactModal username={listing.owner.username} />} */}
          </div>
        </Box>
      </Paper>
    );
}