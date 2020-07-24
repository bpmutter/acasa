import React, { useState, useEffect, useCallback, useContext } from "react";
import useInput from "../utils/useInputHook";
import MainContentWrapper from "./MainContentWrapper";
import logo from "../theme/logo-big.webp";
import dateParse from "date-fns/parse";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Divider,
  FormGroup,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import WifiIcon from "@material-ui/icons/Wifi";
import format from "date-fns/format";
import { Redirect, useParams } from "react-router-dom";
import Snackbar from "./Snackbar";
import Checkbox from "./Checkbox";
import DateSelector from "./DateSelector";
import RadioGroup from "./RadioGroup";
import SelectOption from "./SelectOption";
import ContentPaper from "./ContentPaper";
import GoogleMapsAutoComplete from "./GoogleMapsSearchBox";
import SelectMultiple from "./SelectMultiple";
import hometypes from "../hometypes.json";
import postListingToDb from "../queries/listings/postListing";
import UploadOneImage from "./UploadOneImage";
import UploadManyImgs from "./UploadManyImages";
import getListing from '../queries/listings/getListingById';
import fBdateToHtmlString from '../utils/dateFbToHTML';
import context from './Context';
const useStyles = makeStyles((theme) => ({
  titleLogoWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(1.5),
  },
  logo: {
    width: 50,
    paddingBottom: theme.spacing(1),
  },
  progressWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    minWidth: 450,
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    }

  },
  form: {
    padding: theme.spacing(1),
    maxWidth: 750,
  },
  textInput: {
    width: 300,
    margin: ".5rem 0",
  },
  sectionDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadOneImageWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  currentPrimaryImg: {
      display: 'block',
      paddingBottom: theme.spacing(2)
  },
  primaryImg: { 
    maxWidth: 250,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    fontFamily: theme.typography.special,
    width: "100%",
    padding: theme.spacing(1.5),
    fontSize: theme.typography.fontSize * 2,
  },
}));

let todayStr = format(Date.now(), "y-MM-d");
const oneToTenOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10+" },
];

export default function CreateListing() {
  const classes = useStyles();
  const {id} = useParams();
  const {user: {uid}} = useContext(context);

  const [snackbar, setSnackbar] = useState({
    msg: null,
    severity: null,
  });

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [publish_now, setPublishNow] = useState(null);
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [location, setLocation] = useState({});
  const [location_description, setLocationDescription] = useState("");
  const [shared, setShared] = useState(null);
  const [living_with_host, setLivingWithHost] = useState(null);
  const [roommates, setRoommates] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [max_guests, setMaxGuests] = useState("");
  const [wifi_speed, setWifiSpeed] = useState("");
  const [rules, setRules] = useState([]);
  const [pets, setPets] = useState([]);
  const [payment_methods, setPaymentMethods] = useState([]);
  const [lgbtq, setLgbtq] = useState(null);
  const [primary_img, setPrimaryImage] = useState(null);
  const [additional_imgs, setAdditionalImages] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [resMsg, setResMsg] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect( ()=>{
    (async () => {
    if(uid){
      const listing = await getListing(id);
        if (listing.owner.uid !== uid) {

          setRedirect(`/listings/${listing.id}`);
          return;
        }
        const {title, type, description, active, price, start_date, end_date, location, 
                        location_description, shared, roommates, bedrooms, bathrooms,
                        max_guests, wifi_speed, rules, pets, lgbtq, living_with_host, primary_img,
                        additional_imgs, payment_methods 
                      } = listing;
        setTitle(title);
        setType(type);
        setDescription(description);
        setPublishNow(active);
        setPrice(price);
        setStartDate(fBdateToHtmlString(start_date)); //TODO: convert to date picker readable
        setEndDate(fBdateToHtmlString(end_date)); //TODO: convert to date picker readable
        setLocation(location);
        setLocationDescription(location_description);
        setShared(shared);
        setRoommates(roommates);
        setBedrooms(bedrooms);
        setBathrooms(bathrooms);
        setMaxGuests(max_guests);
        setWifiSpeed(wifi_speed);
        setRules(rules);
        setPets(pets);
        setLgbtq(lgbtq);
        setLivingWithHost(living_with_host);
        setPrimaryImage(primary_img);
        setAdditionalImages(additional_imgs);
        setPaymentMethods(payment_methods);
    }  
    })();
  },[uid, id])
  const updateListing = async (e) => {
    e.preventDefault();
    if (!shared) {
      setLivingWithHost(false);
      setRoommates("");
    }
    const priceInt = parseInt(price.value);
    const bathroomsInt = parseInt(bathrooms);
    const bedroomsInt = parseInt(bedrooms);
    const maxGuestsInt = parseInt(max_guests);
    let roommatesInt = "";
    if (roommates) roommatesInt = parseInt(roommates);
    let wifiInt = "";
    if (wifi_speed.value) wifiInt = parseInt(wifi_speed.value);

    //TODO add data converters
    const startDateObj = dateParse(start_date, "yyyy-MM-dd", new Date());
    let endDate = "";
    if (end_date) {
      endDate = dateParse(end_date, "yyyy-MM-dd", new Date());
    }

    const listing = {
      title: title.value,
      type,
      price: priceInt,
      active: publish_now,
      start_date: startDateObj,
      end_date: endDate,
      description: description.value,
      location,
      location_description: location_description.value,
      shared,
      roommates: roommatesInt,
      living_with_host,
      bedrooms: bedroomsInt,
      bathrooms: bathroomsInt,
      max_guests: maxGuestsInt,
      wifi_speed: wifiInt,
      rules,
      pets,
      lgbtq,
      primary_img,
      additional_imgs,
      payment_methods,
    };
    await postListingToDb(listing, setResMsg);
  };

  return (
    <>
      <>
        {redirect && (
          <div>
            {" "}
            <Redirect to={redirect} />{" "}
          </div>
        )}
      </>
      <>
        {resMsg && resMsg.message.type === "success" && (
          <div>
            <Redirect to={`/listings/${resMsg.redirectId}`} />
          </div>
        )}
      </>
      <>
        {resMsg && (
          <>
            <Snackbar
              msgSeverity={resMsg.message.type}
              msg={resMsg.message.content}
              onClose={() => setResMsg(null)}
            />
          </>
        )}
      </>

      <MainContentWrapper>
        <ContentPaper>
          <div className={classes.titleLogoWrapper}>
            <img src={logo} alt="aCasa logo" className={classes.logo} />
            <Typography
              variant="h4"
              component="h3"
              color="primary"
              align="center"
              className={classes.title}
            >
              Update Listing
            </Typography>
          </div>
          {!title ? (
            <div className={classes.progressWrapper}>
              <CircularProgress size={100} color="primary" />
            </div>
          ) : (
            <form className={classes.form} noValidate onSubmit={updateListing}>
              <div className={classes.primaryInfo}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Basic Information
                </Typography>
                <div>
                  {console.log("title is...", title)}
                  <TextField
                    name="title"
                    label="Listing Title"
                    color="secondary"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.textInput}
                    required
                  />
                </div>
                <div>
                  <SelectOption
                    required={true}
                    labelText={"Property Type"}
                    name="type"
                    options={hometypes}
                    formSetter={setType}
                    defaultValue={type}
                  />
                </div>
                <div>
                  {price && (
                    <TextField
                      name="price"
                      type="number"
                      label="Price per Month in Dollars"
                      color="secondary"
                      className={classes.textInput}
                      defaultValue={price}
                      onChange={(e) => setPrice(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      required
                      helperText="NOTE: You can negotiate price with guests once they've contacted you. "
                    />
                  )}
                </div>
                <div>
                  {publish_now !== null && (
                    <RadioGroup
                      formLabel="Publish Now *"
                      ariaLabel="publish listing publicly"
                      name="active"
                      required={true}
                      defaultValue={JSON.stringify(publish_now)}
                      formSetter={setPublishNow}
                      className={classes.textInput}
                      options={[
                        { value: "true", label: "Yes" },
                        { value: "false", label: "Not Right Now" },
                      ]}
                    />
                  )}
                </div>
                <div>
                  <TextField
                    name="description"
                    label="Property Description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    color="secondary"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.dates}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Dates
                </Typography>
                {start_date && (
                  <DateSelector
                    className={classes.textInput}
                    labelText="Start Date"
                    defaultValue={start_date}
                    required={true}
                    formSetter={setStartDate}
                  />
                )}
                {end_date && (
                  <DateSelector
                    className={classes.textInput}
                    defaultValue={end_date}
                    labelText="End Date"
                    required={false}
                    helperText="Only include if there is a fixed end date for the availability"
                    formSetter={setEndDate}
                  />
                )}
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.location}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Location
                </Typography>
                {location.description && (
                  <div style={{ paddingTop: ".5em", paddingBottom: ".5em" }}>
                    <Typography>
                      <b>Your current location is: </b> {location.description}
                    </Typography>
                  </div>
                )}
                <GoogleMapsAutoComplete
                  variant="standard"
                  label="Location"
                  name="location"
                  required
                  formSetter={setLocation}
                  className={classes.textInput}
                />
                <TextField
                  name="location_description"
                  label="Location Description"
                  multiline
                  defaultValue={location_description}
                  onChange={(e) => setLocationDescription(e.target.value)}
                  rows={4}
                  color="secondary"
                  style={{ width: "100%" }}
                />
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.dates}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Occupancy
                </Typography>
                <div>
                  {shared !== null && (
                    <RadioGroup
                      formLabel="Shared *"
                      ariaLabel="apartment is shared option"
                      name="shared"
                      required={true}
                      defaultValue={JSON.stringify(shared)}
                      className={classes.textInput}
                      formSetter={setShared}
                      options={[
                        { value: "true", label: "Yes" },
                        { value: "false", label: "No" },
                      ]}
                    />
                  )}
                </div>
                {shared === true && (
                  <FormGroup
                    row
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>
                      <SelectOption
                        required={true}
                        labelText={"Roommates"}
                        name="roommates"
                        defaultValue={roommates}
                        formSetter={setRoommates}
                        options={oneToTenOptions}
                        className={classes.textInput}
                      />
                    </div>
                    <div>
                      {living_with_host !== null && (
                        <Checkbox
                          label={"Living with Host"}
                          name="living_with_host"
                          formSetter={setLivingWithHost}
                          className={classes.textInput}
                          defaultValue={living_with_host}
                        />
                      )}
                    </div>
                  </FormGroup>
                )}
                <FormGroup row>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Bedrooms"}
                      name="bedrooms"
                      formSetter={setBedrooms}
                      options={oneToTenOptions}
                      defaultValue={bedrooms}
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Bathrooms"}
                      name="bathrooms"
                      formSetter={setBathrooms}
                      options={oneToTenOptions}
                      defaultValue={bathrooms}
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Max Guests"}
                      name="max_guests"
                      formSetter={setMaxGuests}
                      options={oneToTenOptions}
                      defaultValue={max_guests}
                    />
                  </div>
                </FormGroup>
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.contact}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                >
                  Additional Information
                </Typography>
                <Typography variant="p" component="p" color="textSecondary">
                  It is highly recommended to include the following information
                  to make your listing stand out and be more searchable.
                </Typography>
                <FormGroup row>
                  <div>
                    {wifi_speed && (
                      <TextField
                        name="wifi_speed"
                        type="number"
                        label="Wifi speed (Mbps)"
                        color="secondary"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WifiIcon color="secondary" />
                            </InputAdornment>
                          ),
                        }}
                        className={classes.textInput}
                        defaultValue={wifi_speed}
                        onChange={wifi_speed.onChange}
                      />
                    )}
                  </div>
                  <div>
                    <SelectMultiple
                      options={[
                        "Quiet after 10 PM",
                        "No parties",
                        "No overnight guests",
                        "No smoking",
                      ]}
                      label="House Rules"
                      formSetter={setRules}
                      defaultValue={rules}
                    />
                  </div>
                </FormGroup>
                <FormGroup
                  row
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div>
                    <SelectMultiple
                      options={[
                        "Cats",
                        "Dogs",
                        "Fish",
                        "Guinea Pigs",
                        "Hamsters",
                        "Insects",
                        "Rabbits",
                        "Reptiles",
                      ]}
                      label="Pets"
                      formSetter={setPets}
                      defaultValue={pets}
                    />
                  </div>
                  <div>
                    <SelectMultiple
                      options={[
                        "Bank Transfer",
                        "Cash",
                        "Card",
                        "Cheque",
                        "Cryptocurrency",
                        "Other (discuss with host)",
                      ]}
                      label="Payment Methods"
                      formSetter={setPaymentMethods}
                      defaultValue={payment_methods}
                    />
                  </div>
                  <div style={{ paddingTop: 12 }}>
                    {lgbtq !== null && (
                      <Checkbox
                        label={"LGBTQ+ Friendly"}
                        name="lgbtq"
                        formSetter={setLgbtq}
                        defaultValue={lgbtq}
                      />
                    )}
                  </div>
                </FormGroup>
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.images}>
                <Typography
                  variant="h5"
                  component="h3"
                  color="primary"
                  className={classes.title}
                  style={{ paddingBottom: ".5em" }}
                >
                  Images
                </Typography>
                <div>
                  <Typography component="h4" variant="h6">
                    Select the listing's primary image
                  </Typography>
                  <Typography color="textSecondary">
                    This will be featured prominently throughout the site, so
                    make you it's a picture you really like!
                  </Typography>
                  <div className={classes.uploadOneImageWrapper}>
                    {primary_img && (
                      <>
                        <div className={classes.currentPrimaryImg}>
                          <Typography component="p" variant="h6" align="center">
                            Current Primary Image
                          </Typography>
                          <img
                            src={primary_img}
                            alt={primary_img}
                            className={classes.primaryImg}
                          />
                        </div>
                        <UploadOneImage
                          formSetter={setPrimaryImage}
                          required={true}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <Typography component="h4" variant="h6">
                    Select additional images
                  </Typography>
                  <Typography color="textSecondary">
                    Add some more photos to help make your listing shine.
                  </Typography>
                  <Typography color="textSecondary">
                    <b>NOTE:</b> at this time you can only bulk add photos, so if you
                    want to keep your current photos and add others, you need to
                    add them again.
                  </Typography>
                  {additional_imgs !== null && <UploadManyImgs
                    formSetter={setAdditionalImages}
                    defaultImages={additional_imgs}
                  />}
                </div>
              </div>
              <Divider className={classes.sectionDivider} />
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  type="submit"
                >
                  Post Listing!
                </Button>
              </div>
            </form>
          )}
        </ContentPaper>
      </MainContentWrapper>
    </>
  );
}
