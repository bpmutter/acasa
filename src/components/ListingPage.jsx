import React, {useState, useEffect, useCallback} from 'react';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import ListingHeader from './ListingHeader';
import ListingPhotos from './ListingPhotos';
import ContactModal from './ContactModal';
import {Box, makeStyles, Typography, Link, Chip, 
    Avatar, Divider, List, ListItem, 
    ListItemIcon, ListItemText} from '@material-ui/core';
import dateFormatter from '../utils/dateFormatter';
import {useParams} from 'react-router-dom';
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
import getListingById from '../queries/listings/getListingById'
const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "grid",
    maxWidth: 1200,
    gridTemplateColumns: "2.25fr 1fr",
    gridTemplateRows: "auto auto auto",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
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
    display: "flex",
    justifyContent: "center",
  },
  chip: {
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0.25),
      padding: theme.spacing(0.25),
      fontSize: theme.typography.fontSize * 0.75,
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
    paddingBottom: theme.spacing(1.5),
  },
  locationDescription: { 
    marginTop: theme.spacing(1.5)
  },
  mapWrapper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  availableNow: {
    color: theme.palette.secondary.dark,
    fontFamily: theme.typography.special,
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
  },
}));

export default function ListingPage(){

    const [listing, setListing] = useState({
      owner: {},
      additional_imgs: [],
      location: { geometry: {location: {}}},
      payment_methods: [],
    })
    const [availableNow, setAvailableNow] = useState(false);
    const classes = useStyles();
    const {id} = useParams();
    const overview = listing.shared ? `Room in shared ${listing.type}` : `Whole ${listing.type}`;
    
    //make sure goes to top of window on page load
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const getListing = useCallback(async () => {
      const listing = await getListingById(id);
      setListing(listing);
      console.log('LISTING IS::',listing)
      let currentTime = new Date();
      currentTime = currentTime.getTime();
      const availableFrom = listing.start_date.toMillis();
      setAvailableNow(availableFrom <= currentTime)

    }, [id])

    useEffect(()=>{
      getListing()
    },[getListing])

    return (
      <>
        <ListingHeader listing={listing} />
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
                {listing.title  && <div>
                  <Typography
                    className={classes.title}
                    component="h3"
                    variant="h5"
                    align="center"
                  >
                    {overview}
                  </Typography>
                  <Box className={classes.chips}>
                    <Chip
                      icon={<HotelIcon />}
                      label={
                        listing.bedrooms >= 10
                          ? `${listing.bedrooms}+ bedroom`
                          : `${listing.bedrooms} bedroom`
                      }
                      className={classes.chip}
                    />
                    <Chip
                      icon={<GroupIcon />}
                      label={
                        listing.max_guests >= 10
                          ? `${listing.max_guests}+ guest(s)`
                          : `${listing.max_guests} guest(s)`
                      }
                      className={classes.chip}
                    />
                    <Chip
                      icon={<BathtubIcon />}
                      label={
                        listing.bathrooms >= 10
                          ? `${listing.bathrooms}+ bathroom`
                          : `${listing.bathrooms} bathroom`
                      }
                      className={classes.chip}
                    />
                  </Box>
                </div>}
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
                    <Typography component="p" variant="p" className={classes.locationDescription}>
                      {listing.location_description}
                    </Typography>
                  </div>
                  <div>
                    <div className={classes.mapWrapper}>
                      <ListingMap
                        placeName={listing.location.description}
                        lat={
                          listing.location.geometry
                            ? listing.location.geometry.location.lat
                            : null
                        }
                        lng={
                          listing.location.geometry
                            ? listing.location.geometry.location.lng
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
                <List dense={true}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <>
                          <>
                            {listing.start_date && availableNow && (
                              <Typography
                                className={classes.availableNow}
                                align="center"
                                variant="h6"
                              >
                                Available Now!
                              </Typography>
                            )}
                          </>
                          <>
                            {listing.start_date && !availableNow && (
                              <Typography align="center">
                                <b>Available from:</b>{" "}
                                {dateFormatter(listing.start_date)}
                              </Typography>
                            )}
                          </>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <>
                          {listing.end_date ? (
                            <Typography align="center">
                              <b>Available until:</b>{" "}
                              {dateFormatter(listing.end_date)}
                            </Typography>
                          ) : (
                            <Typography align="center">
                              No specified end date
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                </List>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
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