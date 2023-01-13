import express from "express";
import userController from "../controllers/userController";
import triangleController from "../controllers/triangleController";

const router = express.Router();

// save new triangles
router.post(
  "/",
  userController.verifyJWT,
  triangleController.saveTriangle,
  (req, res) => {
    res.status(200).json({ triangleId: res.locals.triangleId });
  }
);
// read triangles
router.get(
  "/",
  userController.verifyJWT,
  triangleController.getTriangles,
  (req, res) => {
    res.status(200).json(res.locals.triangles);
  }
);

// delete specific triangle
router.delete(
  "/:triangleId",
  userController.verifyJWT,
  triangleController.deleteTriangle,
  (req, res) => {
    res.status(204).json({ triangleId: res.locals.triangleId });
  }
);

export default router;
