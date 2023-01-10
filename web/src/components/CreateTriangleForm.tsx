import { Box, Button, TextField, Typography } from "@mui/material";
import "../stylesheets/create-triangle-form.css";
const CreateTriangleForm = () => {
  return (
    <Box className="triangle-form">
      <Typography>
        Please provide the lengths for the 3 sides of your triangle.
      </Typography>
      <Box className="text-fields">
        <TextField label="Side A"></TextField>
        <TextField label="Side B"></TextField>
        <TextField label="Side C"></TextField>
      </Box>
      <Button variant="contained">Create a Triangle</Button>
      <Box className="image-display">Image</Box>
    </Box>
  );
};

export default CreateTriangleForm;
