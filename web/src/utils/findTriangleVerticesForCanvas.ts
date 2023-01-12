import {
  TriangleAngles,
  TriangleSideLengths,
  TriangleSideLengthsNums,
  TriangleVertices,
} from "../types";

const findTriangleVerticesForCanvas = (
  angles: TriangleAngles,
  triangleSides: TriangleSideLengths,
  canvasWidth: number,
  canvasHeight: number
) => {
  const sideLengthsInPixels = scaleSidesToPixels(triangleSides, canvasWidth);
  const verticesNameAndPos = calculateTriangleVertices(
    sideLengthsInPixels,
    angles
  );
  return verticesNameAndPos;
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
  console.log(sideName);
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
export default findTriangleVerticesForCanvas;
