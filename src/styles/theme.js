import { createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

const main = {
  brown900: brown[900],
  brown800: brown[800],
  brown700: brown[700],
  brown600: brown[600],
  brown500: brown[500],
  brown400: brown[400],
  brown300: brown[300],
  brown200: brown[200],
  brown100: brown[100],
  brown50: brown[50],
};

export const theme = createTheme({
  palette: {
    brown: {
      main: main.brown400,
      light: main.brown300,
      dark: main.brown500,
      contrastText: "#FFFFFF",
    },

    common: {
      border: "#fefefe",
      placeholder: "#fefefe",
      black: "#0F1010",
      grey: "#808388",
      lightgrey: "#eeeff1",
      white: "#FFFFFF",
      background: "#d7ccc8",
    },
  },
});

// primary: "#af6e4d",
//     secondary: "#4b2e2b",
//     bg: "#d3b8ae",
//     black: "#000",
