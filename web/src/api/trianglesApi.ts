import axios from "axios";
import { SaveTriangle } from "../types";

export const saveTriangle = async ({
  type_by_side,
  type_by_angle,
  angle_a,
  angle_b,
  angle_c,
  triangle_image,
}: SaveTriangle) => {
  try {
    const response = await axios.post(`api/triangle`, {
      type_by_side,
      type_by_angle,
      angle_a,
      angle_b,
      angle_c,
      triangle_image,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getTriangles = async () => {
  try {
    const response = await axios.get(`api/triangle`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const deleteTriangle = async (triangleId: number) => {
  try {
    const response = await axios.delete(`api/triangle/${triangleId}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
