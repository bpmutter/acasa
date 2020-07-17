import React, { useState, useEffect, useContext } from "react";
import useInput from '../utils/useInputHook';
import MainContentWrapper from "./MainContentWrapper";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Divider,
  FormGroup
} from "@material-ui/core";
import format from "date-fns/format";
import Snackbar from "./Snackbar";
import Checkbox from './Checkbox';
import DateSelector from './DateSelector';
import RadioGroup from './RadioGroup';
import SelectOption from './SelectOption';
import firebase from "firebase";
import db from "../config/firestoreDb";
import ContentPaper from "./ContentPaper";
// import LanguageInput from './LanguagesInput';
import GoogleMapsAutoComplete from "./GoogleMapsSearchBox";
import SelectMultiple from './SelectMultiple';
import hometypes from "../hometypes.json";


const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
  },
  form: {
    padding: theme.spacing(1),
    maxWidth: 750,
  },
  textInput: {
    width: 300,
    margin: '.5rem 0'
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

export default function CreateListing(){ 

    const classes = useStyles();

    const [snackbar, setSnackbar] = useState({
      msg: null,
      severity: null,
    });
    const [shared, setShared] = useState(true);

    const createListing = async () => {
        //do stuff
    }
    let todayStr = format(Date.now(), 'y-MM-d');
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
    return (
      <>
        <MainContentWrapper>
          <ContentPaper>
            <Typography
              variant="h4"
              component="h3"
              color="primary"
              className={classes.title}
            >
              Create Listing
            </Typography>
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
                  />
                </div>
                <div>
                  <TextField
                    name="price"
                    type="number"
                    label="Price per Month in Dollars"
                    color="secondary"
                    className={classes.textInput}
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
                  formSetter={(val) => val}
                />
                <DateSelector
                  className={classes.textInput}
                  labelText="End Date"
                  required={false}
                  helperText="Only include if there is a fixed end date for the availability"
                  formSetter={(val) => val}
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
                  formSetter={(val) => val}
                  className={classes.textInput}
                />
                <TextField
                  name="location_description"
                  label="Location Description"
                  multiline
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
                {console.log("shared::", shared)}
                {shared && (
                  <FormGroup
                    row
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>
                      <SelectOption
                        required={true}
                        labelText={"Roommates"}
                        name="roommates"
                        options={oneToTenOptions}
                        className={classes.textInput}
                      />
                    </div>
                    <div>
                      <Checkbox
                        label={"Living with Host"}
                        name="living_with_host"
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
                      options={oneToTenOptions}
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Bathrooms"}
                      name="bathrooms"
                      options={oneToTenOptions}
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Bathrooms"}
                      name="bathrooms"
                      options={oneToTenOptions}
                    />
                  </div>
                  <div>
                    <SelectOption
                      required={true}
                      labelText={"Max Guests"}
                      name="max_guests"
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
                      className={classes.textInput}
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
                      formSetter={(val) =>
                        console.log("select multi val::", val)
                      }
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
                      formSetter={(val) =>
                        console.log("select multi val::", val)
                      }
                    />
                  </div>
                  <div style={{paddingTop: 12}}>
                    <Checkbox label={"LGBTQ+ Friendly"} name="lgbtq" />
                  </div>
                </FormGroup>
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={createListing}
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