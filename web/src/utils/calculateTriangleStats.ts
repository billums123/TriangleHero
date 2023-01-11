import { TriangleSideLengths, TriangleSideLengthsNums } from "../types";

const calculateTriangleStats = (triangleSides: TriangleSideLengths) => {
  const triangleSidesNums = {
    sideA: parseFloat(triangleSides.sideA),
    sideB: parseFloat(triangleSides.sideB),
    sideC: parseFloat(triangleSides.sideC),
  };
  const result = {
    typeBySide: "",
    typeByAngle: "",
    angles: {
      angleA: null,
      angleB: null,
      angleC: null,
    },
  };
  result.typeBySide = findTypeBySide(triangleSidesNums);
  findTypeByAngle(triangleSidesNums);

  return result;
};

const findTypeBySide = (triangleSides: TriangleSideLengthsNums): string => {
  const typesBySide = {
    1: "Equilateral",
    2: "Isosceles",
    3: "Scalene",
  };
  let result;
  const sideLengths = Object.values(triangleSides);
  const uniqueSideLengths = new Set(sideLengths);
  switch (uniqueSideLengths.size) {
    case 1:
      result = typesBySide[1];
      break;
    case 2:
      result = typesBySide[2];
      break;
    case 3:
      result = typesBySide[3];
      break;
    default:
      result = "";
  }
  return result;
};
const findTypeByAngle = (triangleSides: TriangleSideLengthsNums): string => {
  const typesByAngle = {
    1: "Acute",
    2: "Obtuse",
    3: "Right",
  };
  const angles = {
    angleA: 0,
    angleB: 0,
    angleC: 0,
  };

  angles.angleA = Math.acos(triangleSides.sideB);
  let result;
  const sideLengths = Object.values(triangleSides);
  const uniqueSideLengths = new Set(sideLengths);
  switch (uniqueSideLengths.size) {
    case 1:
      result = typesByAngle[1];
      break;
    case 2:
      result = typesByAngle[2];
      break;
    case 3:
      result = typesByAngle[3];
      break;
    default:
      result = "";
  }
  return result;
};
export default calculateTriangleStats;
