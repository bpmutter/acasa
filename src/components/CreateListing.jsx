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


const useStyles = makeStyles((theme) => ({
  titleLogoWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
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
  submitButton: {
    margin: theme.spacing(2),
    fontFamily: theme.typography.special,
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
    const [lgbtq, setLgbtq] = useState(false);
    const [primary_img, setPrimaryImage] = useState("")
    const [disableSubmit, setDisableSubmit] = useState(false);

    const createListing = async (e) => {
        e.preventDefault();
        console.log('wasssuppppppp')
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
          start_date,
          'yyyy-MM-dd',
          new Date()
        );
        }

        const listing = {title: title.value, type, price: priceInt, active: publish_now,
                        start_date: startDateObj, end_date: endDate,
                        location, location_description: location_description.value, shared, 
                        roommates: roommatesInt, living_with_host, bedrooms: bedroomsInt, 
                        bathrooms: bathroomsInt, max_guests: maxGuestsInt, wifi_speed: wifiInt, 
                        rules, pets, lgbtq, primary_img
                      }
        console.log(listing);
        const res = await postListingToDb(listing);
        console.log('res msg::', res);
        if(res) {
          setSnackbar({severity: res.message.type, msg: res.message.content})
          return(
            <div>
              <Redirect to={`/listings/${res.id}`}/>
            </div>
          )
        }
    }
    
    return (
      <>
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
                        //TODO add state setter
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
                >
                  Images
                </Typography>
                <UploadOneImage formSetter={setPrimaryImage} required={true}/>
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  // onSubmit={createListing}
                  type="submit"
                >
                  Post Listing!
                </Button>
              </div>
            </form>
          </ContentPaper>
        </MainContentWrapper>
        {snackbar.msg && (
          <Snackbar msgSeverity={snackbar.severity} msg={snackbar.msg} />
        )}
      </>
    );
}