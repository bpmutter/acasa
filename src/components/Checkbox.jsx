import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";


export default function CheckboxWithLabel({name, label, formSetter, helperText, defaultValue}) {
  const [checked, setChecked] = React.useState(defaultValue);
  const handleChange = e => { 
    const newVal = !checked;
    setChecked(newVal);
    if(formSetter){
        formSetter(newVal)
    }
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name={name}
          helperText={helperText}
        />
      }
      label={label}
    />
  );
}
