import {
  TriangleAngles,
  TriangleSideLengths,
  TriangleSideLengthsNums,
} from "../types";

const convertTriangleAnglesToPixels = (
  angles: TriangleAngles,
  triangleSides: TriangleSideLengths,
  canvasWidth: number,
  canvasHeight: number
) => {
  const sideLengthsInPixels = scaleSidesToPixels(triangleSides, canvasWidth);
  calculateTriangleVertices(sideLengthsInPixels, angles);
};

const scaleSidesToPixels = (
  triangleSides: TriangleSideLengths,
  canvasWidth: number
) => {
  const maxSideLength = Math.max(
    ...Object.values(triangleSides).map((side) => parseFloat(side))
  );
  const scalingFactor = (canvasWidth - 10) / maxSideLength;
  const scaledSides: TriangleSideLengthsNums = {
    sideA: 0,
    sideB: 0,
    sideC: 0,
  };
  Object.entries(triangleSides).map(([side, value]) => {
    scaledSides[side] = parseFloat(triangleSides[side]) * scalingFactor;
  });
  return scaledSides;
};

const calculateTriangleVertices = (
  sideLengths: TriangleSideLengths,
  angles: TriangleAngles
) => {};
export default convertTriangleAnglesToPixels;
