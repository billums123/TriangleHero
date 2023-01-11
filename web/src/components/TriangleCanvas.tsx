import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import "../stylesheets/triangle-canvas.css";
import { TriangleAngles, TriangleSideLengths } from "../types";

interface TriangleCanvasProps {
  triangleSideLengths: TriangleSideLengths;
  angles: TriangleAngles;
}

const TriangleCanvas = ({
  triangleSideLengths,
  angles,
}: TriangleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.beginPath();
      ctx?.moveTo(75, 50);
      ctx?.lineTo(100, 75);
      ctx?.lineTo(100, 25);
      ctx?.fill();
    }
  }, []);
  console.log("width", canvasRef.current?.getBoundingClientRect());
  console.log("height", canvasRef.current?.getBoundingClientRect());
  return (
    <Box className="triangle-image-container">
      <canvas className="canvas" ref={canvasRef} />
    </Box>
  );
};
export default TriangleCanvas;
