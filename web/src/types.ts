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
  angleA: number | string;
  angleB: number | string;
  angleC: number | string;
  [key: string]: number | string;
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
  [key: string]: any;
}

export interface TriangleTypesResult
  extends Omit<TriangleStatisticsResult, "angles"> {}

export interface TriangleVertices {
  name: string;
  position: [number, number] | [];
}
