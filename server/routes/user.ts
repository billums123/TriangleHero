import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// create a new user and assign jwt
router.post(
  "/signup",
  userController.registerNewUser,
  userController.assignJWT,
  (req, res) => {
    res
      .status(200)
      .json({ userId: res.locals.userId, username: res.locals.username });
  }
);

// verify login credentials assign jwt if valid credentials are provided
router.post(
  "/login",
  userController.verifyUser,
  userController.assignJWT,
  (req, res) => {
    res
      .status(200)
      .json({ userId: res.locals.userId, username: res.locals.username });
  }
);

// get route for verifying log in
router.get("/login", userController.verifyJWT, (req, res) => {
  res
    .status(200)
    .json({ userId: res.locals.userId, username: res.locals.username });
});

// delete cookie with jwt to log user out
router.delete("/login", (req, res) => {
  res.clearCookie("access_token");
  res.sendStatus(204);
});

// router.put("/", (req, res) => {});

// router.delete("/", (req, res) => {});

export default router;
