import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { TriangleSideLengths } from "../types";
import "../stylesheets/create-triangle-form.css";

const CreateTriangleForm = () => {
  const [triangleSideLengths, setTriangleSideLengths] =
    useState<TriangleSideLengths>({
      sideA: null,
      sideB: null,
      sideC: null,
    });
  const handleUpdateTriangleSideLength = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTriangleSideLengths({
      ...triangleSideLengths,
      [e.target.name]: e.target.value,
    });
  };
  console.log("state", triangleSideLengths);
  return (
    <Box className="triangle-form">
      <Typography>
        Please provide the lengths for the 3 sides of your triangle.
      </Typography>
      <Box className="text-fields">
        <TextField
          name="sideA"
          label="Side A"
          onChange={handleUpdateTriangleSideLength}
        ></TextField>
        <TextField
          name="sideB"
          label="Side B"
          onChange={handleUpdateTriangleSideLength}
        ></TextField>
        <TextField
          name="sideC"
          label="Side C"
          onChange={handleUpdateTriangleSideLength}
        ></TextField>
      </Box>
      <Button variant="contained">Create a Triangle</Button>
      <Box className="image-display">Image</Box>
    </Box>
  );
};

export default CreateTriangleForm;
