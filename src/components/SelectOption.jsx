import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  formControl: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectOption({labelText, name, options, changeHandler}) {
  const classes = useStyles();
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple" color="secondary">
          {labelText}
        </InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          label={labelText}
          inputProps={{
            name: name,
          }}
          color="secondary"
        >
          <option aria-label="None" value="" />
          {options &&
            options.map((option) => (
              <option value={option.value}>{option.text}</option>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
