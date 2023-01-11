import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { TriangleSideLengths, TriangleSideLengthsErrors } from "../types";
import "../stylesheets/create-triangle-form.css";
import validateTriangleSides from "../utils/validateTriangleSides";

// const triangleSidesTextFieldData = [
//   {
//     name: "sideA",
//     label: "side A",
//   },
//   {
//     name: "sideB",
//     label: "side B",
//   },
//   {
//     name: "sideC",
//     label: "side C",
//   },
// ];

const CreateTriangleForm = () => {
  const [triangleSideLengths, setTriangleSideLengths] =
    useState<TriangleSideLengths>({
      sideA: "",
      sideB: "",
      sideC: "",
    });
  const [formErrors, setFormErrors] = useState<TriangleSideLengthsErrors>({
    sideA: false,
    sideB: false,
    sideC: false,
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
      console.log(validateTriangleSides(triangleSideLengths));
    }
  }, [triangleSideLengths]);
  return (
    <Box className="triangle-form">
      <Typography>
        Please provide the lengths for the 3 sides of your triangle.
      </Typography>
      <Box className="text-fields">
        <TextField
          // error
          // helperText="Wrong"
          value={triangleSideLengths.sideA}
          name="sideA"
          label="Side A"
          type={"number"}
          onChange={handleUpdateTriangleSideLength}
        ></TextField>
        <TextField
          value={triangleSideLengths.sideB}
          name="sideB"
          label="Side B"
          type={"number"}
          onChange={handleUpdateTriangleSideLength}
        ></TextField>
        <TextField
          value={triangleSideLengths.sideC}
          name="sideC"
          label="Side C"
          type={"number"}
          onChange={handleUpdateTriangleSideLength}
        ></TextField>
      </Box>
      <Button
        disabled={
          !triangleSideLengths.sideA ||
          !triangleSideLengths.sideB ||
          !triangleSideLengths.sideC
        }
        variant="contained"
      >
        Create Triangle
      </Button>
      <Box className="image-display">Image</Box>
    </Box>
  );
};

export default CreateTriangleForm;
