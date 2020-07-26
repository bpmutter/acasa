import React, { useState, useEffect, useContext } from "react";
import useInput from '../utils/useInputHook';
import MainContentWrapper from "./MainContentWrapper";
import logo from "../theme/logo-big.webp";
import dateParse from "date-fns/parse";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Divider,
  FormGroup, InputAdornment
} from "@material-ui/core";
import WifiIcon from "@material-ui/icons/Wifi";
import format from "date-fns/format";
import {Redirect} from 'react-router-dom';
import Snackbar from "./Snackbar";
import Checkbox from './Checkbox';
import DateSelector from './DateSelector';
import RadioGroup from './RadioGroup';
import SelectOption from './SelectOption';
import ContentPaper from "./ContentPaper";
import GoogleMapsAutoComplete from "./GoogleMapsSearchBox";
import SelectMultiple from './SelectMultiple';
import hometypes from "../hometypes.json";
import postListingToDb from '../queries/listings/postListing';
import UploadOneImage from './UploadOneImage';
import UploadManyImgs from "./UploadManyImages";


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
    display: "block",
    paddingBottom: theme.spacing(2),
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

export default function CreateListing(){ 

    const classes = useStyles();

    const [snackbar, setSnackbar] = useState({
      msg: null,
      severity: null,
    });
    
    const title = useInput("");
    const [type, setType] = useState("");
    const price = useInput("");
    const [publish_now, setPublishNow] = useState(true);
    const description = useInput("");
    const [start_date, setStartDate] = useState(todayStr);
    const [end_date, setEndDate] = useState("");    
    const [location, setLocation] = useState({});    
    const location_description = useInput("");
    const [shared, setShared] = useState(true);
    const [living_with_host, setLivingWithHost] = useState(false)
    const [roommates, setRoommates] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [max_guests, setMaxGuests] = useState("");
    const wifi_speed = useInput("");
    const [rules, setRules] = useState([]);
    const [pets, setPets] = useState([]);
    const [payment_methods, setPaymentMethods] = useState([]);
    const [lgbtq, setLgbtq] = useState(false);
    const [primary_img, setPrimaryImage] = useState("");
    const [additional_imgs, setAdditionalImages] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [resMsg, setResMsg] = useState(null);

    const createListing = async (e) => {
        e.preventDefault();
        if(!shared){
          setLivingWithHost(false);
          setRoommates("");
        }
        const priceInt = parseInt(price.value)
        const bathroomsInt = parseInt(bathrooms);
        const bedroomsInt = parseInt(bedrooms);
        const maxGuestsInt = parseInt(max_guests);
        let roommatesInt = "";
        if(roommates) roommatesInt = parseInt(roommates)
        let wifiInt = "";
        if(wifi_speed.value) wifiInt = parseInt(wifi_speed.value);

        //TODO add data converters
        const startDateObj = dateParse(
          start_date,
          'yyyy-MM-dd',
          new Date()
        );
        let endDate = "";
        if(end_date){
          endDate = dateParse(
          end_date,
          'yyyy-MM-dd',
          new Date()
        );
        }

        const listing = {
                        title: title.value, type, price: priceInt, active: publish_now,
                        start_date: startDateObj, end_date: endDate, description: description.value,
                        location, location_description: location_description.value, shared, 
                        roommates: roommatesInt, living_with_host, bedrooms: bedroomsInt, 
                        bathrooms: bathroomsInt, max_guests: maxGuestsInt, wifi_speed: wifiInt, 
                        rules, pets, lgbtq, primary_img, additional_imgs, payment_methods
                      }
        await postListingToDb(listing, setResMsg);
    }
    
    return (
      <>
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
                Create Listing
              </Typography>
            </div>

            <form className={classes.form} noValidate onSubmit={createListing}>
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
                  <TextField
                    name="title"
                    label="Listing Title"
                    color="secondary"
                    defaultValue={title.value}
                    onChange={title.onChange}
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
                  />
                </div>
                <div>
                  <TextField
                    name="price"
                    type="number"
                    label="Price per Month in Dollars"
                    color="secondary"
                    className={classes.textInput}
                    defaultValue={price.value}
                    onChange={price.onChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    required
                    helperText="NOTE: You can negotiate price with guests once they've contacted you. "
                  />
                </div>
                <div>
                  <RadioGroup
                    formLabel="Publish Now *"
                    ariaLabel="publish listing publicly"
                    name="active"
                    required={true}
                    defaultValue="true"
                    formSetter={setPublishNow}
                    className={classes.textInput}
                    options={[
                      { value: "true", label: "Yes" },
                      { value: "false", label: "Not Right Now" },
                    ]}
                  />
                </div>
                <div>
                  <TextField
                    name="description"
                    label="Property Description"
                    defaultValue={description.value}
                    onChange={description.onChange}
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
                <DateSelector
                  className={classes.textInput}
                  labelText="Start Date"
                  defaultValue={todayStr}
                  required={true}
                  formSetter={setStartDate}
                />
                <DateSelector
                  className={classes.textInput}
                  labelText="End Date"
                  required={false}
                  helperText="Only include if there is a fixed end date for the availability"
                  formSetter={setEndDate}
                />
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
                  defaultValue={location_description.value}
                  onChange={location_description.onChange}
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
                  <RadioGroup
                    formLabel="Shared *"
                    ariaLabel="apartment is shared option"
                    name="shared"
                    required={true}
                    defaultValue="true"
                    className={classes.textInput}
                    formSetter={setShared}
                    options={[
                      { value: "true", label: "Yes" },
                      { value: "false", label: "No" },
                    ]}
                  />
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
                        formSetter={setRoommates}
                        options={oneToTenOptions}
                        className={classes.textInput}
                      />
                    </div>
                    <div>
                      <Checkbox
                        label={"Living with Host"}
                        name="living_with_host"
                        formSetter={setLivingWithHost}
                        className={classes.textInput}
                      />
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
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Bathrooms"}
                      name="bathrooms"
                      formSetter={setBathrooms}
                      options={oneToTenOptions}
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Max Guests"}
                      name="max_guests"
                      formSetter={setMaxGuests}
                      options={oneToTenOptions}
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
                      defaultValue={wifi_speed.value}
                      onChange={wifi_speed.onChange}
                    />
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
                    />
                  </div>
                  <div style={{ paddingTop: 12 }}>
                    <Checkbox
                      label={"LGBTQ+ Friendly"}
                      name="lgbtq"
                      formSetter={setLgbtq}
                    />
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
                      
                    )}
                    <UploadOneImage
                      formSetter={setPrimaryImage}
                      required={true}
                    />
                  </div>
                </div>
                <div>
                  <Typography component="h4" variant="h6">
                    Select additional images
                  </Typography>
                  <Typography color="textSecondary">
                    Add some more photos to help make your listing shine.
                  </Typography>
                  <UploadManyImgs formSetter={setAdditionalImages} />
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
          </ContentPaper>
        </MainContentWrapper>
      </>
    );
}