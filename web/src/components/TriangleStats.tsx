import { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
} from "@mui/material";
import "../stylesheets/triangle-stats.css";
import {
  ValidateTriangleSidesResponse,
  TriangleStatisticsResult,
  TriangleAngles,
  TriangleTypesResult,
  SaveTriangle,
} from "../types";
import { saveTriangle } from "../api/trianglesApi";

interface TriangleStatsProps {
  canvasRef: any;
  validTriangle: ValidateTriangleSidesResponse;
  triangleStats: TriangleStatisticsResult;
}

const TriangleStats = ({
  canvasRef,
  validTriangle,
  triangleStats,
}: TriangleStatsProps) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [canvasState, setCanvasState] = useState(null);

  const handleSaveTriangle = async () => {
    const canvas = canvasRef.current;
    let dataURL = "default";
    if (canvas) {
      // save canvas to png file and remove prefix to URL
      dataURL = await canvas
        .toDataURL()
        .replace(/^data:image\/\w+;base64,/, "");
    }
    const saveTriangleStats: SaveTriangle = {
      type_by_side: triangleStats.typeBySide,
      type_by_angle: triangleStats.typeByAngle,
      angle_a: triangleStats.angles.angleA,
      angle_b: triangleStats.angles.angleB,
      angle_c: triangleStats.angles.angleC,
      triangle_image: dataURL,
    };
    await saveTriangle(saveTriangleStats);
    navigate("/triangles");
  };

  const triangleTypeLabels: TriangleTypesResult = {
    typeBySide: "Type by Side",
    typeByAngle: "Type by Angle",
  };
  const triangleAnglesLabels: TriangleAngles = {
    angleA: "Angle A",
    angleB: "Angle B",
    angleC: "Angle C",
  };

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
      <Box className="button-box">
        {user ? (
          <>
            <Button
              disabled={!validTriangle.isValid}
              variant="contained"
              className="button"
              onClick={handleSaveTriangle}
            >
              Save Triangle
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={!validTriangle.isValid}
              variant="contained"
              className="button"
              onClick={() =>
                navigate("/signup", {
                  state: "Create an account to save your triangles",
                })
              }
            >
              Save Triangle
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
export default TriangleStats;
