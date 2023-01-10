import { Outlet } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import CreateTriangleForm from "./CreateTriangleForm";
import "../stylesheets/main-container.css";
const MainContainer = () => {
  return (
    <Paper className="container">
      <Outlet />
    </Paper>
  );
};

export default MainContainer;
