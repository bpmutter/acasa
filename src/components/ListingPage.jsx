import React from 'react';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import ListingHeader from './ListingHeader';
import ListingPhotos from './ListingPhotos';
import {Paper, Box, makeStyles, Typography, IconButton, Link, Chip, 
    Avatar, Button, Divider, List, ListItem, 
    ListItemIcon, ListItemText} from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotelIcon from "@material-ui/icons/Hotel";
import GroupIcon from "@material-ui/icons/Group";
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PetsIcon from "@material-ui/icons/Pets";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GavelIcon from "@material-ui/icons/Gavel";
import ListingMap from './ListingMap';

const useStyles = makeStyles((theme) => ({
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
  sectionDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  primaryContent: { 

  }
}));

export default function ListingPage(){
    const listing = { 
        location: {
            description: 'Medellin, Colombia',
            location_description: 'Nice small apartment near party street of the 70, shopping, and many good restaurants.'
        },
        owner: {},
        description: 'blah blah blah',
        payment_methods: ['Bitcoin', 'Cash', 'Paypal']
    }
    const classes = useStyles();
    const overview = listing.roommates ? `Room in shared ${listing.type}` : `Whole ${listing.type}`;

    return (
      <>
        <ListingHeader />
        <MainContentWrapper>
          <ListingPhotos />
          <main>
            <section className={classes.primaryContent}>
              <ContentPaper>
                <div>
                  <Typography>{overview}</Typography>
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
                      <Chip
                        label="🏳️‍🌈 LGBTQ+ friendly"
                        className={classes.chip}
                      />
                    )}
                  </Box>
                </div>
                <Divider className={classes.sectionDivider} />
                {listing.description && (
                  <>
                    <div>
                      <Typography>Overview</Typography>
                      <p>{listing.description}</p>
                    </div>
                    <Divider className={classes.sectionDivider} />
                  </>
                )}
                <div>
                  <Typography>Additional Info</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <SupervisedUserCircleIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>
                            <b>Living with Host:</b>{" "}
                            {listing.living_with_host ? "Yes" : "No"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PetsIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>
                            <b>Pets:</b>{" "}
                            {listing.pets && listing.pets.length
                              ? listing.pets.join(", ")
                              : "None"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MonetizationOnIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>
                            <b>Payment Methods:</b>{" "}
                            {listing.payment_methods &&
                            listing.payment_methods.length
                              ? listing.payment_methods.join(", ")
                              : "Discuss with host"}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <GavelIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>
                            <b>House Rules:</b>{" "}
                            {listing.rules && listing.rules.length
                              ? listing.rules.join(", ")
                              : "Discuss with host"}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Divider className={classes.sectionDivider} />
                </div>
                <div>
                  <Typography>Location</Typography>
                  <Typography>{listing.location.description}</Typography>
                  {listing.location.location_description && (
                    <Typography>
                      {listing.location.location_description}
                    </Typography>
                  )}
                  <div>
                      <ListingMap placeName="37 Ludlow Dr, Chappaqua, NY 10514"/>
                  </div>
                </div>
              </ContentPaper>
            </section>
          </main>
        </MainContentWrapper>
      </>
    );
}