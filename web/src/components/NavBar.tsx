import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../stylesheets/nav-bar.css";
import theme from "../theme";
import { UserContext } from "../App";
import { logoutUser } from "../api/usersApi";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    const loggedOut = await logoutUser();
    if (loggedOut) {
      setUser(null);
      navigate("/");
    }
  };

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
      {user ? (
        <>
          <Button
            className="button"
            color="secondary"
            onClick={() => navigate("/triangles")}
          >
            {`${user.username}'s Triangles`}
          </Button>
          <Button className="button" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};
export default NavBar;
