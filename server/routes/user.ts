import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/signup", userController.registerNewUser, (req, res) => {
  res
    .status(200)
    .json({ userId: res.locals.userId, username: res.locals.username });
});
// router.post("/login", userController.verifyUser, (req, res) => {
//   res.status(200).json(res.locals.id);
// });

// router.put("/", (req, res) => {});

// router.delete("/", (req, res) => {});

export default router;
