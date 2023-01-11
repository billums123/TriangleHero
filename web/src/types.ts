export interface TriangleSideLengths {
  sideA: string;
  sideB: string;
  sideC: string;
  [key: string]: string;
}
export interface TriangleSideLengthsNums {
  sideA: number;
  sideB: number;
  sideC: number;
  [key: string]: number;
}
export interface TriangleAngles {
  angleA: number;
  angleB: number;
  angleC: number;
  [key: string]: number;
}
export interface ValidateTriangleSidesResponse {
  isValid: boolean | null;
  errorMessage: string;
  noEmptyFields: boolean;
}

export interface TriangleStatisticsResult {
  typeBySide: string;
  typeByAngle: string;
  angles: TriangleAngles;
}
