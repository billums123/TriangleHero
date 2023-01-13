import { RequestResponseNext } from "../types";
import db from "../database/dbModel";
import * as dotenv from "dotenv";

dotenv.config();

interface TriangleController {
  saveTriangle: RequestResponseNext;
  getTriangles: RequestResponseNext;
  deleteTriangle: RequestResponseNext;
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

      const converted_triangle_image = Buffer.from(triangle_image, "base64");

      const saveTriangleText =
        "INSERT INTO triangles (type_by_side, type_by_angle, angle_a, angle_b, angle_c, triangle_image, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
      const saveTriangleValues = [
        type_by_side,
        type_by_angle,
        angle_a,
        angle_b,
        angle_c,
        converted_triangle_image,
        user_id,
      ];
      const response = await db.query(saveTriangleText, saveTriangleValues);
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

  getTriangles: async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const user_id = userId;

      const getTrianglesText = "SELECT * FROM triangles WHERE user_id = $1";
      const getTrianglesValues = [user_id];
      const response = await db.query(getTrianglesText, getTrianglesValues);

      if (response.rows[0].triangle_image !== "default") {
        response.rows.forEach((row) => {
          const buffer = Buffer.from(row.triangle_image);
          const base_64 = buffer.toString("base64");
          row.triangle_image = `data:image/png;base64,${base_64}`;
        });
      }
      res.locals.triangles = response.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in triangleController.getTriangles ${error}`,
        status: 404,
        message: "Can't find triangles!",
      });
    }
  },

  deleteTriangle: async (req, res, next) => {
    const triangleId = req.params.triangleId;

    const verifyUserIdText = "SELECT user_id FROM triangles WHERE id = $1";
    const verifyUserIdValues = [triangleId];
    const verifyUserIdResponse = await db.query(
      verifyUserIdText,
      verifyUserIdValues
    );
    if (verifyUserIdResponse.rows[0].user_id !== res.locals.userId) {
      return next({
        log: null,
        status: 403,
        message: "You cannot delete accounts that are not your own",
      });
    }
    try {
      // delete the triangle with corresponding id number
      const deleteTriangleText =
        "DELETE FROM triangles where id = $1 returning id";
      const deleteTriangleValues = [triangleId];
      const deleteTriangleResponse = await db.query(
        deleteTriangleText,
        deleteTriangleValues
      );
      res.locals.triangleId = deleteTriangleResponse.rows[0].id;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in triangleController.deleteTriangle ${error}`,
        status: 404,
        message: `Error has occured in triangleController.deleteTriangle ERROR: ${error}`,
      });
    }
  },
};

export default triangleController;
