import { useEffect, useState, useContext } from "react";
import { Box, Grid, IconButton, Paper } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { getTriangles } from "../api/trianglesApi";
import "../stylesheets/saved-triangles.css";
import theme from "../theme";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(() => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1),
  height: "225px",
  width: "325px",
  borderRadius: "20px",
  color: theme.palette.primary.main,
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
}));
const SavedTriangles = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) navigate("/");

  const [triangles, setTriangles] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const getTrianglesResponse = await getTriangles();
      if (getTrianglesResponse) setTriangles(getTrianglesResponse);
    })();
  }, []);

  const handleDeleteTriangle = async () => {
    () => {
      await deleteTriangle(e.target.id);
    };
  };
  const images = triangles?.map((triangle: any) => (
    <Grid>
      <IconButton
        id={triangle.id}
        sx={{ left: "42.5%", top: "15%" }}
        onClick={handleDeleteTriangle}
      >
        <DeleteIcon color="primary" />
      </IconButton>
      <Item>
        <img src={triangle.triangle_image} />
        {`${triangle.type_by_angle} ${triangle.type_by_side}`}
        <br></br>
        {`${triangle.angle_a.toFixed(2)}° | ${triangle.angle_b.toFixed(
          2
        )}° | ${triangle.angle_c.toFixed(2)}°`}
      </Item>
    </Grid>
  ));
  return (
    <Box
      className="saved-triangles-container"
      sx={{ [theme.breakpoints.down("md")]: { minWidth: "95vw" } }}
    >
      <Grid justifyContent="center" container></Grid>
      {triangles ? <>{images}</> : <>NO TRIANGLES SAVED</>}
    </Box>
  );
};
export default SavedTriangles;
