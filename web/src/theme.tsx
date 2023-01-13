import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#242424",
      contrastText: "#ffffffde",
    },
    secondary: {
      main: "#ffffffde",
      contrastText: "#242424",
    },
    error: {
      main: red.A700,
    },
  },
  spacing: 4,
});

export default theme;
