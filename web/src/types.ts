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
  position: [number, number];
}

export interface GetUserInfo {
  userId: number;
  username: string;
}
export interface CreateUserOrLogin {
  username: string;
  plainPassword: string;
  [key: string]: string;
}

export interface SaveTriangle {
  type_by_side: string;
  type_by_angle: string;
  angle_a: string | number;
  angle_b: string | number;
  angle_c: string | number;
  triangle_image: string;
  user_id?: number;
}

export interface ListOfTriangles extends SaveTriangle {
  id: number;
}
