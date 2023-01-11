import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { TriangleSideLengths, ValidateTriangleSidesResponse } from "../types";
import "../stylesheets/create-triangle-form.css";
import validateTriangleSides from "../utils/validateTriangleSides";

const triangleSidesTextFieldData = [
  {
    name: "sideA",
    label: "side A",
  },
  {
    name: "sideB",
    label: "side B",
  },
  {
    name: "sideC",
    label: "side C",
  },
];

const CreateTriangleForm = () => {
  const [triangleSideLengths, setTriangleSideLengths] =
    useState<TriangleSideLengths>({
      sideA: "",
      sideB: "",
      sideC: "",
    });
  const [validTriangle, setValidTriangle] =
    useState<ValidateTriangleSidesResponse>({
      isValid: null,
      errorMessage: "",
    });
  const handleUpdateTriangleSideLength = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    //restrict side length to value 6 characters long
    if (
      e.target.value.length <= 6 &&
      (parseInt(e.target.value) >= 0 || e.target.value === "")
    ) {
      setTriangleSideLengths({
        ...triangleSideLengths,
        [e.target.name]: e.target.value,
      });
    }
  };
  //validate that a proper triangle can be made once all side text fields are populated.
  useEffect(() => {
    if (
      Object.values(triangleSideLengths).every(
        (sideLength) => sideLength.length > 0
      )
    ) {
      const validTriangleResponse = validateTriangleSides(triangleSideLengths);
      setValidTriangle(validTriangleResponse);
    }
  }, [triangleSideLengths]);

  const triangleSideTextFields = triangleSidesTextFieldData.map(
    (triangleSide, i) => (
      <TextField
        key={triangleSide.name + i}
        value={triangleSideLengths[triangleSide.name]}
        name={triangleSide.name}
        label={triangleSide.label}
        error={!validTriangle.isValid && validTriangle.isValid !== null}
        type={"number"}
        onChange={handleUpdateTriangleSideLength}
      />
    )
  );
  return (
    <Box className="triangle-form">
      <Typography>
        Please provide the lengths for the 3 sides of your triangle.
      </Typography>
      <Typography variant="body2" color="error">
        {validTriangle.errorMessage}
      </Typography>
      <Box className="text-fields">{triangleSideTextFields}</Box>
      <Button
        disabled={
          Object.values(triangleSideLengths).every(
            (triangleSide) => !triangleSide.length
          ) || !validTriangle.isValid
        }
        variant="contained"
      >
        Create Triangle
      </Button>
      <Box className="image-display">Triangle Image</Box>
    </Box>
  );
};

export default CreateTriangleForm;
