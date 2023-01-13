import express from "express";
import userController from "../controllers/userController";
import triangleController from "../controllers/triangleController";

const router = express.Router();

// create a new user and assign jwt
router.post(
  "/",
  userController.verifyJWT,
  triangleController.saveTriangle,
  (req, res) => {
    res.status(200).json({ triangleId: res.locals.triangleId });
  }
);

export default router;
