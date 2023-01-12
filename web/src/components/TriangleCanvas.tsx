import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import "../stylesheets/triangle-canvas.css";
import {
  TriangleAngles,
  TriangleSideLengths,
  ValidateTriangleSidesResponse,
} from "../types";
import findTriangleVerticesForCanvas from "../utils/findTriangleVerticesForCanvas";

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
      const [vertexOne, vertexTwo, vertexThree] = findTriangleVerticesForCanvas(
        angles,
        triangleSideLengths,
        currentCanvasWidth,
        currentCanvasHeight
      );
      console.log("result", vertexOne, vertexTwo, vertexThree);
      ctx?.beginPath();
      ctx?.moveTo(vertexOne.position[0], vertexOne.position[1]);
      ctx?.lineTo(vertexTwo.position[0], vertexTwo.position[1]);
      ctx?.lineTo(vertexThree.position[0], vertexThree.position[1]);
      ctx?.fill();
      if (ctx) {
        ctx.fillStyle = "green";
      }
    }
  }, [validTriangle]);
  return (
    <Box className="triangle-image-container">
      <canvas className="canvas" ref={canvasRef} />
    </Box>
  );
};
export default TriangleCanvas;
