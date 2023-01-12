import { Box, Button, IconButton } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../stylesheets/nav-bar.css";
import theme from "../theme";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box
      className="nav-bar"
      sx={{ width: "40%", [theme.breakpoints.down("md")]: { width: "95%" } }}
    >
      <Button
        className="button"
        color="secondary"
        startIcon={
          <HomeIcon
            color="secondary"
            fontSize="large"
            style={{ transform: "scale(1.5)" }}
          />
        }
        onClick={() => navigate("/")}
      />
      <Button
        className="button"
        color="secondary"
        onClick={() => navigate("/signup")}
      >
        Create Account
      </Button>
      <Button
        className="button"
        color="secondary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
};
export default NavBar;
