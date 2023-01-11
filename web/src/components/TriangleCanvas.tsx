import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import "../stylesheets/triangle-canvas.css";
import {
  TriangleAngles,
  TriangleSideLengths,
  ValidateTriangleSidesResponse,
} from "../types";
import convertTriangleAnglesToPixels from "../utils/covertTriangleAnglesToPixels";

interface TriangleCanvasProps {
  triangleSideLengths: TriangleSideLengths;
  angles: TriangleAngles;
  validTriangle: ValidateTriangleSidesResponse;
}

const TriangleCanvas = ({
  triangleSideLengths,
  angles,
  validTriangle,
}: TriangleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && validTriangle.isValid) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current?.getBoundingClientRect();
      const currentCanvasWidth =
        canvasRef.current?.getBoundingClientRect().width;
      const currentCanvasHeight =
        canvasRef.current?.getBoundingClientRect().height;
      // ctx?.fillRect(25, 25, 270, 10);
      const result = convertTriangleAnglesToPixels(
        angles,
        triangleSideLengths,
        currentCanvasWidth,
        currentCanvasHeight
      );
      ctx?.beginPath();
      ctx?.moveTo(150, 0);
      ctx?.lineTo(0, 147);
      ctx?.lineTo(300, 150);
      if (ctx) {
        ctx.fillStyle = "green";
      }
      ctx?.fill();
    }
  }, [validTriangle]);
  return (
    <Box className="triangle-image-container">
      <canvas className="canvas" ref={canvasRef} />
    </Box>
  );
};
export default TriangleCanvas;
