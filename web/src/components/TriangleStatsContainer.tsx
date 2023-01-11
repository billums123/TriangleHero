import { Box, Typography } from "@mui/material";
import "../stylesheets/triangle-stats-container.css";
import theme from "../theme";
import { ValidateTriangleSidesResponse, TriangleSideLengths } from "../types";
import calculateTriangleStats from "../utils/calculateTriangleStats";
interface TriangleStatsContainerProps {
  validTriangle: ValidateTriangleSidesResponse;
  triangleSideLengths: TriangleSideLengths;
}

const TriangleStatsContainer = ({
  validTriangle,
  triangleSideLengths,
}: TriangleStatsContainerProps) => {
  if (validTriangle.isValid) {
    console.log(calculateTriangleStats(triangleSideLengths));
  }
  return (
    <Box
      className="triangle-stats-container"
      sx={{
        boxShadow:
          !validTriangle.isValid && validTriangle.noEmptyFields
            ? `0 6px 20px 0 ${theme.palette.error.main}`
            : "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      <Box className="triangle-stats-list">
        <Typography
          variant="h6"
          color={validTriangle.isValid ? "green" : "error"}
        >
          <strong>
            {validTriangle.isValid ? "Valid Triangle" : "Invalid Triangle"}
          </strong>
        </Typography>
      </Box>
      <Box className="triangle-image">Triangle Image</Box>
    </Box>
  );
};
export default TriangleStatsContainer;
