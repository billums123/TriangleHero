import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import "../stylesheets/triangle-canvas.css";
import {
  TriangleAngles,
  TriangleSideLengths,
  ValidateTriangleSidesResponse,
} from "../types";
import findTriangleVerticesForCanvas from "../utils/findTriangleVerticesForCanvas";
import theme from "../theme";

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
  const [copyOfTriangleSideLengths, setCopyOfTriangleSideLengths] =
    useState(triangleSideLengths);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef?.current.getContext("2d");
      const currentCanvasWidth =
        canvasRef.current?.getBoundingClientRect().width;
      const currentCanvasHeight =
        canvasRef.current?.getBoundingClientRect().height;
      //clear canvas everytime there is change in side lengths or there is an invalid triangle
      if (
        triangleSideLengths.sideA !== copyOfTriangleSideLengths.sideA ||
        triangleSideLengths.sideB !== copyOfTriangleSideLengths.sideB ||
        triangleSideLengths.sideC !== copyOfTriangleSideLengths.sideC ||
        !validTriangle.isValid
      ) {
        ctx?.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight);
        setCopyOfTriangleSideLengths(triangleSideLengths);
      }
      if (validTriangle.isValid) {
        const vertices = findTriangleVerticesForCanvas(
          angles,
          triangleSideLengths,
          currentCanvasHeight,
          currentCanvasWidth
        );
        ctx?.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight);
        ctx?.beginPath();
        vertices.forEach((vertex, i) => {
          if (i === 0) ctx?.moveTo(vertex.position[0], vertex.position[1]);
          else ctx?.lineTo(vertex.position[0], vertex.position[1]);
        });
        ctx?.fill();
        if (ctx) {
          ctx.fillStyle = `${theme.palette.primary.main}`;
        }
      }
    }
  });
  return (
    <Box className="triangle-image-container">
      <canvas className="canvas" ref={canvasRef} />
    </Box>
  );
};
export default TriangleCanvas;
