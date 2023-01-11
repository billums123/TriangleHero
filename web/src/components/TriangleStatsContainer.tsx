import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import "../stylesheets/triangle-stats-container.css";
import theme from "../theme";
import {
  ValidateTriangleSidesResponse,
  TriangleSideLengths,
  TriangleStatisticsResult,
  TriangleAngles,
  TriangleTypesResult,
} from "../types";
import calculateTriangleStats from "../utils/calculateTriangleStats";

interface TriangleStatsContainerProps {
  validTriangle: ValidateTriangleSidesResponse;
  triangleSideLengths: TriangleSideLengths;
}

const TriangleStatsContainer = ({
  validTriangle,
  triangleSideLengths,
}: TriangleStatsContainerProps) => {
  const [triangleStats, setTriangleStats] = useState<TriangleStatisticsResult>({
    typeBySide: "--",
    typeByAngle: "--",
    angles: {
      angleA: "--",
      angleB: "--",
      angleC: "--",
    },
  });
  const triangleTypeLabels: TriangleTypesResult = {
    typeBySide: "Type by Side",
    typeByAngle: "Type by Angle",
  };
  const triangleAnglesLabels: TriangleAngles = {
    angleA: "Angle A",
    angleB: "Angle B",
    angleC: "Angle C",
  };

  useEffect(() => {
    if (validTriangle.isValid) {
      setTriangleStats(calculateTriangleStats(triangleSideLengths));
    } else {
      setTriangleStats({
        typeBySide: "--",
        typeByAngle: "--",
        angles: {
          angleA: "--",
          angleB: "--",
          angleC: "--",
        },
      });
    }
  }, [validTriangle]);
  const triangleTypeRows = Object.keys(triangleStats)
    .filter((key) => key !== "angles")
    .map((key) => (
      <TableRow key={triangleTypeLabels[key]}>
        <TableCell key={triangleTypeLabels[key]}>
          {triangleTypeLabels[key]}
        </TableCell>
        <TableCell>
          <strong>{triangleStats[key]}</strong>
        </TableCell>
      </TableRow>
    ));
  const triangleAnglesRows = Object.keys(triangleStats.angles).map((key) => (
    <TableRow key={triangleAnglesLabels[key]}>
      <TableCell key={triangleAnglesLabels[key]}>
        {triangleAnglesLabels[key]}
      </TableCell>
      <TableCell key={triangleAnglesLabels[key] + "1"}>
        <strong>
          {typeof triangleStats.angles[key] === "number"
            ? (triangleStats.angles[key] as number).toFixed(2) + "°"
            : triangleStats.angles[key]}
        </strong>
      </TableCell>
    </TableRow>
  ));

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
        <Table size="small">
          <TableBody>
            {triangleTypeRows}
            {triangleAnglesRows}
          </TableBody>
        </Table>
      </Box>
      <Box className="triangle-image">Triangle Image</Box>
    </Box>
  );
};
export default TriangleStatsContainer;
