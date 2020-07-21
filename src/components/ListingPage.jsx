import React from 'react';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import ListingHeader from './ListingHeader';
import ListingPhotos from './ListingPhotos';
import ContactModal from './ContactModal';
import {Paper, Box, makeStyles, Typography, IconButton, Link, Chip, 
    Avatar, Button, Divider, List, ListItem, 
    ListItemIcon, ListItemText} from '@material-ui/core';
import dateFormatter from '../utils/dateFormatter';
import HotelIcon from "@material-ui/icons/Hotel";
import GroupIcon from "@material-ui/icons/Group";
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PetsIcon from "@material-ui/icons/Pets";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GavelIcon from "@material-ui/icons/Gavel";
import ListingMap from './ListingMap';
import LooksIcon from "@material-ui/icons/Looks";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "grid",
    maxWidth: 1400,
    gridTemplateColumns: "2.25fr 1fr",
    gridTemplateRows: "auto auto auto",
  },
  mainContent: {
    margin: theme.spacing(1),
    gridColumn: "1 / 2",
    gridRow: "1/4",
  },
  availability: {
    margin: theme.spacing(1),
    gridColumn: "2 / 3",
    gridRow: "1/2",
  },
  contactOwner: {
    margin: theme.spacing(1),
    gridColumn: "2 / 3",
    gridRow: "2/3",
  },
  title: {
    color: theme.palette.primary.dark,
    fontFamily: theme.typography.special,
  },
  chips: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0.25),
    },
  },
  listingDescription: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
  },
  sectionDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  locationTopContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
  mapWrapper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  ownerInfo: {
    display: "inline-flex",
    justifyContent: "left",
    alignItems: "center", 
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(1.5),
  },
  contactButton: {
    marginTop: theme.spacing(2),
    alignSelf: "center",
    justifySelf: "center",
    // paddingRight: theme.spacing(3),
  },
}));

export default function ListingPage(){
    const listing = {
      title: "great home!",
      primary_img:
        "https://firebasestorage.googleapis.com/v0/b/acasa-bd3af.appspot.com/o/listings%2F368f5875-9226-4e51-a7cb-c998fad29db4-bb872026-24a2-48a6-be5c-4b523868f25a.webp?alt=media&token=0b798b40-0b7a-490d-8e47-fe487556ca5e",
      additional_imgs: [
        "https://firebasestorage.googleapis.com/v0/b/acasa-bd3af.appspot.com/o/listings%2F368f5875-9226-4e51-a7cb-c998fad29db4-bb872026-24a2-48a6-be5c-4b523868f25a.webp?alt=media&token=0b798b40-0b7a-490d-8e47-fe487556ca5e",
        "https://firebasestorage.googleapis.com/v0/b/acasa-bd3af.appspot.com/o/listings%2F368f5875-9226-4e51-a7cb-c998fad29db4-bb872026-24a2-48a6-be5c-4b523868f25a.webp?alt=media&token=0b798b40-0b7a-490d-8e47-fe487556ca5e",
        "https://firebasestorage.googleapis.com/v0/b/acasa-bd3af.appspot.com/o/listings%2F368f5875-9226-4e51-a7cb-c998fad29db4-bb872026-24a2-48a6-be5c-4b523868f25a.webp?alt=media&token=0b798b40-0b7a-490d-8e47-fe487556ca5e",
        "https://firebasestorage.googleapis.com/v0/b/acasa-bd3af.appspot.com/o/listings%2F368f5875-9226-4e51-a7cb-c998fad29db4-bb872026-24a2-48a6-be5c-4b523868f25a.webp?alt=media&token=0b798b40-0b7a-490d-8e47-fe487556ca5e",
      ],
      location: {
        description: "Medellin, Colombia",
        location_description:
          "Nice small apartment near party street of the 70, shopping, and many good restaurants.",
        geometry: {
          location: { lat: -34.652713, lng: -58.776642 },
        },
      },
      owner: {
        username: "ben-perlmutter-1594856042049",
        first_name: "Ben",
        last_name: "Perlmutter",
        profile_picture:
          "https://lh3.googleusercontent.com/a-/AOh14Gg9WbJE0awcv_EPhlqHyIMSTqLbvbSdjzmXOunEcQ",
      },
      description: "blah blah blah",
      payment_methods: ["Bitcoin", "Cash", "Paypal"],
      wifi_speed: 50,
      lgbtq: true,
      shared: false,
      bathrooms: 3,
      bedrooms: 3,
      max_guests: 4,
      type: "House",
      price: 500,
    };
    const classes = useStyles();
    const overview = listing.roommates ? `Room in shared ${listing.type}` : `Whole ${listing.type}`;
    const currentTime = new Date()

    return (
      <>
        <ListingHeader listing={listing}/>
        <MainContentWrapper>
          <div>
            <ListingPhotos 
              title={listing.title} 
              primaryImg={listing.primary_img}
              additionalImgs={listing.additional_imgs}
            />
          </div>
          <main className={classes.contentWrapper}>
            <section className={classes.mainContent}>
              <ContentPaper>
                <div>
                  <Typography className={classes.title}
                    component="h3" variant="h5"
                    align='center'
                  >{overview}</Typography>
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
                  </Box>
                </div>
                {listing.description && (
                  <>
                    <div>
                      <Typography className={classes.listingDescription}>
                        {listing.description}
                      </Typography>
                    </div>
                  </>
                )}
                <Divider className={classes.sectionDivider} />
                <div>
                  <Typography
                    component="h2"
                    variant="h5"
                    className={classes.title}
                  >
                    Additional Info
                  </Typography>
                  <List dense>
                    {listing.wifi && (
                      <ListItem>
                        <ListItemIcon>
                          <WifiIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography>
                              <b>Wifi:</b> {listing.wifi_speed} mb/s
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    {listing.wifi && (
                      <ListItem>
                        <ListItemIcon>
                          <WifiIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography>
                              <b>Wifi:</b> {listing.wifi_speed} mb/s
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    {listing.lgbtq && (
                      <ListItem>
                        <ListItemIcon>
                          <LooksIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography>LGBTQ+ Friendly</Typography>}
                        />
                      </ListItem>
                    )}
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
                  <div className={classes.locationTopContent}>
                    <Typography
                      component="h2"
                      variant="h5"
                      className={classes.title}
                      style={{ paddingRight: "1.5em" }}
                    >
                      Location
                    </Typography>
                    <Typography component="p" variant="h6">
                      {listing.location.description}
                    </Typography>
                  </div>
                  {listing.location.location_description && (
                    <Typography>
                      {listing.location.location_description}
                    </Typography>
                  )}
                  <div>
                    <div className={classes.mapWrapper}>
                      <ListingMap
                        placeName={listing.location.description}
                        latLng={
                          listing.location.geometry
                            ? [
                                listing.location.geometry.location.lat,
                                listing.location.geometry.location.lng,
                              ]
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </ContentPaper>
            </section>
            <section className={classes.availability}>
              {/* TODO: FIX THIS uP WITH DATES */}
              <ContentPaper>
                <Typography
                  component="h2"
                  variant="h5"
                  className={classes.title}
                >
                  Availability
                </Typography>
                <div>
                  <Typography>
                    <p>
                      {listing.end_date ? (
                        <span>
                          Available until {dateFormatter(listing.end_date)}
                        </span>
                      ) : (
                        <span>No specified end date</span>
                      )}
                    </p>
                  </Typography>
                </div>
              </ContentPaper>
            </section>
            <section className={classes.contactOwner}>
              <ContentPaper>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.title}
                  style={{ textAlign: "center" }}
                >
                  Owner Info
                </Typography>
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
                <div style={{display:'flex', justifyContent: 'center'}}>
                  <ContactModal
                    username={listing.owner.username}
                    className={classes.contactButton}
                  />
                </div>
              </ContentPaper>
            </section>
          </main>
        </MainContentWrapper>
      </>
    );
}