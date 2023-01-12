import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import "../stylesheets/main-container.css";
import theme from "../theme";
const MainContainer = () => {
  return (
    <Box
      className="container"
      sx={{
        bgcolor: "secondary.main",
        [theme.breakpoints.down("md")]: { width: "75%" },
        [theme.breakpoints.down("sm")]: { width: "90%" },
      }}
    >
      <Outlet />
    </Box>
  );
};

export default MainContainer;
