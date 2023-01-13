import { useEffect, useState, useContext } from "react";
import { Box, CircularProgress, Grid, IconButton, Paper } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { deleteTriangle, getTriangles } from "../api/trianglesApi";
import "../stylesheets/saved-triangles.css";
import theme from "../theme";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ListOfTriangles } from "../types";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  if (!user) navigate("/");

  const [triangles, setTriangles] = useState<ListOfTriangles[] | null>(null);

  useEffect(() => {
    (async () => {
      const getTrianglesResponse = await getTriangles();
      if (getTrianglesResponse[0].id) setTriangles(getTrianglesResponse);
    })();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const handleDeleteTriangle = async (triangleId: number) => {
    await deleteTriangle(triangleId);
    if (triangles) {
      await setTriangles(
        triangles.filter((triangle) => triangle.id !== triangleId)
      );
    }
  };
  const triangleImages = triangles?.map((triangle) => (
    <Grid key={triangle.id}>
      <IconButton
        sx={{ left: "42.5%", top: "15%" }}
        onClick={() => {
          handleDeleteTriangle(triangle.id);
        }}
      >
        <DeleteIcon color="primary" />
      </IconButton>
      <Item>
        <img src={triangle.triangle_image} />
        {`${triangle.type_by_angle} ${triangle.type_by_side}`}
        <br></br>
        {`${(triangle.angle_a as number).toFixed(2)}° | ${(
          triangle.angle_b as number
        ).toFixed(2)}° | ${(triangle.angle_c as number).toFixed(2)}°`}
      </Item>
    </Grid>
  ));
  return (
    <Box
      className="saved-triangles-container"
      sx={{ [theme.breakpoints.down("md")]: { minWidth: "95vw" } }}
    >
      <Grid justifyContent="center" container></Grid>
      {triangles ? (
        <>{triangleImages}</>
      ) : (
        <Box className="no-triangles-message">
          {loading ? <CircularProgress /> : "NO SAVED TRIANGLES"}
        </Box>
      )}
    </Box>
  );
};
export default SavedTriangles;
