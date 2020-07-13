import React from 'react';
import App from './App';
import {
  ThemeProvider,
} from "@material-ui/core/styles";
import {themeLight, themeDark} from '../theme/theme';


console.log("THEME BEFORE CONTEXT::", themeLight);


const AppContext = () => {

    return (
      <ThemeProvider theme={themeLight}>
        <App />
      </ThemeProvider>
    );
}

export default AppContext