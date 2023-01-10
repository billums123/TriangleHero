import { red } from "@mui/material/colors";
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
      contrastText: "#fff",
    },
    secondary: {
      main: "#EF8354",
      light: "#f29b76",
      dark: "#e95818",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
      // main: '#DB5461',
    },
  },
  spacing: 4,
});

export default theme;
