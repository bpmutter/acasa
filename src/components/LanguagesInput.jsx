import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TextField, Button, Chip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  button: {
    height: '2em'
  }
}));

export default function LayoutTextFields({formSetter, name, value}) {
  const classes = useStyles();

  const [input, setInput] = useState(value);
  const [languages, setLanguages] = useState([]);

  const changeHandler = (e) => { 
    setInput(e.target.value)
  }
  const submitHandler = () => {
    let langArr = input.split(",");
    if(langArr[0] !== ""){
      langArr = langArr.map((lang) => lang.trim());
      setLanguages(langArr);
      formSetter(langArr)
    }
    

  }
  return (
    <div className={classes.root}>
      <div className={classes.inputWrapper}>
        <TextField
          id="languages-input"
          label="Languages"
          name={name}
          helperText="Please separate with commas and hit the 'Add' button"
          value={input}
          onChange={changeHandler}
          color="secondary"
        />
        <Button className={classes.button} onClick={submitHandler}>
          Add
        </Button>
      </div>
      <div className={classes.languageChips}>
        {
          languages.map((language) => (
            <Chip
              label={language}
              className={classes.chip}
            />
          ))}
      </div>
    </div>
  );
}
