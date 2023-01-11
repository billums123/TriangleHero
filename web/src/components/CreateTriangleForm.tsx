import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { TriangleSideLengths, ValidateTriangleSidesResponse } from "../types";
import "../stylesheets/create-triangle-form.css";
import validateTriangleSides from "../utils/validateTriangleSides";
import TriangleStatsContainer from "./TriangleStatsContainer";
const triangleSidesTextFieldData = [
  {
    name: "sideA",
    label: "Side A",
  },
  {
    name: "sideB",
    label: "Side B",
  },
  {
    name: "sideC",
    label: "Side C",
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
      isValid: false,
      errorMessage: "",
      noEmptyFields: false,
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
    {
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
        error={!validTriangle.isValid && validTriangle.errorMessage.length > 0}
        type={"number"}
        onChange={handleUpdateTriangleSideLength}
        sx={{ mt: "3%", mb: "3%" }}
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
      <TriangleStatsContainer
        validTriangle={validTriangle}
        triangleSideLengths={triangleSideLengths}
      />
    </Box>
  );
};

export default CreateTriangleForm;
