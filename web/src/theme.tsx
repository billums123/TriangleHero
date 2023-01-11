import { green, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    desktopfullhd: true;
    desktop2k: true;
    desktop4k: true;
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#242424",
      // light: "#BFC0C0",
      // dark: "#242734",
      contrastText: "#ffffffde",
    },
    secondary: {
      main: "#ffffffde",
      light: "#f29b76",
      dark: "#e95818",
      contrastText: "#242424",
    },
    error: {
      main: red.A700,
    },
  },
  spacing: 4,
});

export default theme;
