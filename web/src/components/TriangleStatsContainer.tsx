import { useEffect, useState, useRef } from "react";
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
  
  //create a reference to the <canvas> element to use within the TriangleCanvas component
  const canvasRef = useRef<any>(null);
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
        canvasRef={canvasRef}
        validTriangle={validTriangle}
        triangleStats={triangleStats}
      />
      <TriangleCanvas
        canvasRef={canvasRef}
        triangleSideLengths={triangleSideLengths}
        angles={triangleStats.angles}
        validTriangle={validTriangle}
      />
    </Box>
  );
};
export default TriangleStatsContainer;
