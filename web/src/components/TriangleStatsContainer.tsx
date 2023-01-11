import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "../stylesheets/triangle-stats-container.css";
import theme from "../theme";
import {
  ValidateTriangleSidesResponse,
  TriangleSideLengths,
  TriangleStatisticsResult,
} from "../types";
import calculateTriangleStats from "../utils/calculateTriangleStats";
import TriangleStats from "./TriangleStats";
import TriangleCanvas from "./TriangleCanvas";

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
      <TriangleStats
        validTriangle={validTriangle}
        triangleStats={triangleStats}
      />
      <TriangleCanvas
        triangleSideLengths={triangleSideLengths}
        angles={triangleStats.angles}
      />
    </Box>
  );
};
export default TriangleStatsContainer;
