import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import "../stylesheets/not-found.css";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box className="not-found">
      <Typography variant="h6">
        <strong>404:&nbsp;</strong>Hmmm....this page doesn't seem to exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        RETURN TO HOME PAGE
      </Button>
    </Box>
  );
};

export default NotFound;
