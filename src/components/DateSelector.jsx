import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
export default function DatePickers({labelText, formSetter, required, defaultValue, helperText}) {
  const classes = useStyles();
  
  const changeHandler = e => {
    e.preventDefault();
    formSetter(e.target.value)
  }
  return (
    <form className={classes.container} noValidate>
      <TextField
        label={labelText}
        type="date"
        color="secondary"
        required={required}
        defaultValue={defaultValue}
        helperText={helperText}
        onChange={changeHandler}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
