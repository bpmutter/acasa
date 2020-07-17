import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";


export default function CheckboxWithLabel({name, label, formSetter, helperText}) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = e => { 
    setChecked(!checked);
    if(formSetter){
        formSetter(checked)
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
