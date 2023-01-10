import { Paper, Typography } from "@mui/material";
import "../stylesheets/header.css";
const Header = () => {
  return (
    <div className="header">
      <Typography variant="h2" color={"primary.contrastText"}>
        <strong>Triangle Hero</strong>
      </Typography>
    </div>
  );
};

export default Header;
