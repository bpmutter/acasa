import React, {useState} from 'react';
import {Paper, Box, makeStyles, Typography, IconButton, Link, Chip, Avatar, Button} from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotelIcon from "@material-ui/icons/Hotel";
import GroupIcon from "@material-ui/icons/Group";
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import ContactModal from './ContactModal'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    minHeight: 250,
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  },
  mainContent: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    width: "100%",
    minHeight: 225,
  },
  topContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heartButton: {
    color: pink[500],
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "space-between",
    paddingRight: theme.spacing(1.5)
  },
  price: {
    minWidth: 150,
    textAlign: "center",
    marginRight: theme.spacing(2),
  },
  chips: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  owner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: theme.spacing(4),
  },
  ownerInfo: {
    display: "inline-flex",
    justifyContent: "left",
    alignItems: "center",
  },
  contactOwner: {
    display: "inline-block",
  },
  button: {
    fontFamily: theme.typography.special,
    display: "inline-block",
    position: "static",
    height: 40,
  },
}));

export default function ListingCard({listing}){
    const classes = useStyles();
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
              {hearted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          <Box className={classes.owner}>
            <Box className={classes.ownerInfo}>
              <Avatar
                src={listing.owner.profile_picture}
                alt={`${listing.owner.first_name} ${listing.owner.last_name}`}
                style={{ marginRight: 10 }}
              />
              Listed by{" "}
              <Link
                href={`/users/${listing.owner.username}`}
                style={{ marginLeft: 5 }}
              >
                {`${listing.owner.first_name} ${listing.owner.last_name}`}
              </Link>
            </Box>
            {console.log('LISTING OWNER INFO', listing.owner.username)}
            <ContactModal username={listing.owner.username}/>
          </Box>
        </Box>
      </Paper>
    );
}