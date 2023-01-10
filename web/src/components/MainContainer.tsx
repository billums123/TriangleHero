import { Outlet } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import CreateTriangleForm from "./CreateTriangleForm";
import "../stylesheets/main-container.css";
const MainContainer = () => {
  return (
    <Box bgcolor="secondary.main" className="container">
      <Outlet />
    </Box>
  );
};

export default MainContainer;
