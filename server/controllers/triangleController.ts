import { RequestResponseNext } from "../types";
import db from "../database/dbModel";
import * as dotenv from "dotenv";

dotenv.config();

interface TriangleController {
  saveTriangle: RequestResponseNext;
}

const triangleController: TriangleController = {
  saveTriangle: async (req, res, next) => {
    try {
      const {
        type_by_side,
        type_by_angle,
        angle_a,
        angle_b,
        angle_c,
        triangle_image,
      } = req.body;
      const { userId } = res.locals;
      const user_id = userId;

      const saveTriangleText =
        "INSERT INTO triangles (type_by_side, type_by_angle, angle_a, angle_b, angle_c, triangle_image, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
      const saveTriangleValues = [
        type_by_side,
        type_by_angle,
        angle_a,
        angle_b,
        angle_c,
        triangle_image,
        user_id,
      ];
      const response = await db.query(saveTriangleText, saveTriangleValues);
      console.log("RESPONSE", response.rows[0].id);
      res.locals.triangleId = response.rows[0].id;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in triangleController.saveTriangle ${error}`,
        status: 409,
        message: "Triangle already exists!",
      });
    }
  },
};

export default triangleController;
