import {
  TriangleSideLengths,
  TriangleSideLengthsNums,
  TriangleStatisticsResult,
} from "../types";

const calculateTriangleStats = (triangleSides: TriangleSideLengths) => {
  const triangleSidesNums = {
    sideA: parseFloat(triangleSides.sideA),
    sideB: parseFloat(triangleSides.sideB),
    sideC: parseFloat(triangleSides.sideC),
  };
  const result: TriangleStatisticsResult = {
    typeBySide: "",
    typeByAngle: "",
    angles: {
      angleA: 0,
      angleB: 0,
      angleC: 0,
    },
  };
  result.typeBySide = findTypeBySide(triangleSidesNums);
  const { typeByAngle, angles } = findTypeByAngle(triangleSidesNums);
  result.typeByAngle = typeByAngle;
  result.angles = angles;

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
const findTypeByAngle = ({
  sideA,
  sideB,
  sideC,
}: TriangleSideLengthsNums): Omit<TriangleStatisticsResult, "typeBySide"> => {
  const typesByAngle = {
    1: "Right",
    2: "Obtuse",
    3: "Acute",
  };
  const result = {
    typeByAngle: "",
    angles: {
      angleA: 0,
      angleB: 0,
      angleC: 0,
    },
  };
  result.angles.angleA = lawOfCosinesCalculator(sideA, sideB, sideC);
  result.angles.angleB = lawOfCosinesCalculator(sideB, sideA, sideC);
  result.angles.angleC = lawOfCosinesCalculator(sideC, sideA, sideB);

  if (Object.values(result.angles).includes(90)) {
    result.typeByAngle = typesByAngle[1];
  } else if (Object.values(result.angles).some((angle) => angle > 90)) {
    result.typeByAngle = typesByAngle[2];
  } else {
    result.typeByAngle = typesByAngle[3];
  }
  return result;
};

//returns values in degree from
const lawOfCosinesCalculator = (
  sideOppositeCalculatedAngle: number,
  side1: number,
  side2: number
): number => {
  return (
    (180 / Math.PI) *
    Math.acos(
      (side1 ** 2 + side2 ** 2 - sideOppositeCalculatedAngle ** 2) /
        (2 * side1 * side2)
    )
  );
};
export default calculateTriangleStats;
