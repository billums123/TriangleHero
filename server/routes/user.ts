import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// router.post("/login", userController.verifyUser, (req, res) => {
//   res.status(200).json(res.locals.id);
// });

router.post("/signup", userController.registerNewUser, (req, res) => {
  res.status(200).json(res.locals.newUserId);
});

// router.put("/", (req, res) => {});

// router.delete("/", (req, res) => {});

export default router;
