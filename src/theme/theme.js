
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


let themeLight = createMuiTheme({
  palette: {
    primary: {
      main: "#8e24aa",
    },
    secondary: {
      main: "#1de9b6",
    },
    gradients: {
      primary: "linear-gradient(90deg, rgba(142,36,170,1) 0%, rgba(254,102,197,1) 100%)",
      secondary: "linear-gradient(90deg, rgba(29,233,182,1) 20%, rgba(34,193,195,1) 100%)",

    }
  },
  typography: {
    special: "'Fredoka One', cursive",
  },
});
themeLight = responsiveFontSizes(themeLight);

let themeDark = createMuiTheme({

})
themeDark = responsiveFontSizes(themeDark)


export {themeLight, themeDark}

// const getTheme = () => {
//   let overwrites = {
//     "palette": {
//         "primary1Color": "#7e57c2",
//         "primary2Color": "#ff4081",
//         "accent1Color": "#d1c4e9",
//         "accent2Color": "#f48fb1",
//         "pickerHeaderColor": "#26c6da",
//         "textColor": "#616161",
//         "canvasColor": "rgba(255, 255, 255, 0.87)"
//     }
// };
//   return getMuiTheme(baseTheme, overwrites);
// }
