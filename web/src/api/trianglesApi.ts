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
    console.log("RESPONSEFRONT", response.data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
