import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup({defaultValue, formLabel, ariaLabel, name, options, required, formSetter}) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (e) => {
    
    setValue(e.target.value);
    if (formSetter) {
      if(options[0].value === "true" && options[1].value === 'false'){
        // const boolVal = e.target.value === "true";
        formSetter(e.target.value === "true");
        return;
      }
      formSetter(value);
      
    } 
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" color="secondary">{formLabel}</FormLabel>
      <RadioGroup
        aria-label={ariaLabel}
        name={name}
        value={value || JSON.stringify(defaultValue)}
        onChange={handleChange}
        required={required}
        row
      >
        {options.map(option=>(
            <FormControlLabel value={option.value} control={<Radio checked={value===option.value}/>} label={option.label} />

        ))}


      </RadioGroup>
    </FormControl>
  );
}
