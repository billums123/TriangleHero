import {
  TriangleAngles,
  TriangleSideLengths,
  TriangleSideLengthsNums,
  TriangleVertices,
} from "../types";

const findTriangleVerticesForCanvas = (
  angles: TriangleAngles,
  triangleSides: TriangleSideLengths,
  canvasHeight: number,
  canvasWidth: number
) => {
  const sideLengthsInPixels = scaleSidesToPixels(triangleSides, canvasHeight);
  const verticesNameAndPos = calculateTriangleVertices(
    sideLengthsInPixels,
    angles
  );
  const [xCentroid, yCentroid] = findTriangleCentroid(verticesNameAndPos);

  centerTriangleOnCanvas(
    verticesNameAndPos,
    xCentroid,
    yCentroid,
    canvasWidth,
    canvasHeight
  );
  verifyVerticesAreWithinCanvas(verticesNameAndPos, canvasHeight, canvasWidth);

  return verticesNameAndPos;
};
const verifyVerticesAreWithinCanvas = (
  vertices: TriangleVertices[],
  canvasHeight: number,
  canvasWidth: number
) => {
  const xPos: number[] = [];
  const yPos: number[] = [];
  vertices.forEach((vertex) => {
    if (vertex.position[0] < 0 || vertex.position[0] > canvasWidth) {
      xPos.push(vertex.position[0]);
    }
    if (vertex.position[1] < 0 || vertex.position[1] > canvasHeight) {
      yPos.push(vertex.position[1]);
    }
  });
  const scalingFactorX = canvasWidth / Math.max(...xPos);
  const scalingFactorY = canvasHeight / Math.max(...yPos);
  const scalingFactor = Math.max(scalingFactorX, scalingFactorY);
  if (scalingFactor) {
    vertices.forEach((vertex) => {
      vertex.position[0] *= scalingFactor;
      vertex.position[1] *= scalingFactor;
    });
    return true;
  }
  return false;
};

const scaleSidesToPixels = (
  triangleSides: TriangleSideLengths,
  canvasHeight: number
) => {
  const maxSideLength = Math.max(
    ...Object.values(triangleSides).map((side) => parseFloat(side))
  );
  let scalingFactor = canvasHeight / maxSideLength;
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
  sideLengths: TriangleSideLengthsNums,
  angles: TriangleAngles
) => {
  //sort by longest length to shortest, the top side will always be the longest length
  // DIAGRAM OF WHERE EACH SIDE REFERENCES TO
  //          firstSide
  //          ---------
  //          \       /
  // thirdSide \     / secondSide
  //            \   /
  //              \/
  const [firstSide, secondSide, thirdSide]: [
    sideName: string,
    sideLength: number
  ][] = Object.entries(sideLengths).sort((a, b) => b[1] - a[1]);

  const vertices: TriangleVertices[] = [];
  //find first vertex
  vertices.push({
    name: `${removeAllButLastLetter(secondSide[0])}`,
    position: [0, 0],
  });
  //find second vertex
  vertices.push({
    name: `${removeAllButLastLetter(thirdSide[0])}`,
    position: [firstSide[1], 0],
  });
  //find third vertex
  vertices.push({
    name: `${removeAllButLastLetter(firstSide[0])}`,
    position: calculateThirdVertexPosition(angles, secondSide, thirdSide),
  });
  return vertices;
};

const removeAllButLastLetter = (sideName: string) => {
  return `${sideName[sideName.length - 1]}`;
};

const calculateThirdVertexPosition = (
  angles: TriangleAngles,
  sideForCalculations: [string, number],
  sideForNaming: [string, number]
): [xCoord: number, yCoord: number] => {
  let xCoord: number;
  let yCoord: number;

  const angleAtSecondVertex =
    angles[`angle${removeAllButLastLetter(sideForNaming[0])}`];

  yCoord =
    sideForCalculations[1] *
    Math.sin((angleAtSecondVertex as number) * (Math.PI / 180));

  xCoord =
    sideForCalculations[1] *
    Math.cos((angleAtSecondVertex as number) * (Math.PI / 180));
  return [xCoord, yCoord];
};

const findTriangleCentroid = (
  vertices: TriangleVertices[]
): [xCentroid: number, yCentroid: number] => {
  let xSum = 0;
  let ySum = 0;
  let xCentroid = 0;
  let yCentroid = 0;
  for (let i = 0; i < vertices.length; i++) {
    xSum += vertices[i].position[0];
    ySum += vertices[i].position[1];
  }
  xCentroid = xSum / vertices.length;
  yCentroid = ySum / vertices.length;
  return [xCentroid, yCentroid];
};
const centerTriangleOnCanvas = (
  vertices: TriangleVertices[],
  xCentroid: number,
  yCentroid: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const xCentroidDiff = canvasWidth / 2 - xCentroid;
  const yCentroidDiff = canvasHeight / 2 - yCentroid;
  vertices.forEach((vertex, i) => {
    const updatedXPosVertex = vertices[i].position[0] + xCentroidDiff;
    const updatedYPosVertex = vertices[i].position[1] + yCentroidDiff;
    vertices[i].position = [updatedXPosVertex, updatedYPosVertex];
  });
};

export default findTriangleVerticesForCanvas;
