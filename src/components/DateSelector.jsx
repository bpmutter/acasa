import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import dateJStoHTML from '../utils/dateJStoHTML';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-block",
  },
  textField: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    width: 200,
  },
}));
export default function DatePickers({labelText, formSetter, required, defaultValue, helperText, disablePast}) {
  const classes = useStyles();
  const [date, setDate] = useState(defaultValue || null)
  const changeHandler = (date, value) => {
    // e.preventDefault();
    setDate(date);
    const dateStr = dateJStoHTML(date);
    formSetter(dateStr);
  }
  return (
    <div className={classes.container}>
      <KeyboardDatePicker
        label={labelText}
        color="secondary"
        disablePast={disablePast}
        required={required}
        value={date}
        helperText={helperText}
        onChange={changeHandler}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
