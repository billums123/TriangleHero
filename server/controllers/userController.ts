import { RequestResponseNext } from "../types";
import db from "../database/dbModel";
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

interface UserController {
  registerNewUser: RequestResponseNext;
  assignJWT: RequestResponseNext;
}

const userController: UserController = {
  registerNewUser: async (req, res, next) => {
    try {
      const { username, plainPassword } = req.body;

      if (!username || !plainPassword) {
        return next({
          log: null,
          status: 400,
          message: "Enter a valid username, email, and/or password",
        });
      }
      const passwordHash = await bcrypt.hash(plainPassword, 10);
      const saveNewUserInfoText =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id";
      const saveNewUserInfoValues = [username, passwordHash];
      const response = await db.query(
        saveNewUserInfoText,
        saveNewUserInfoValues
      );
      res.locals.userId = response.rows[0].id;
      res.locals.username = username;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.registerNewUser ${error}`,
        status: 409,
        message: "User already exists!",
      });
    }
  },

  assignJWT: async (req, res, next) => {
    const token = jwt.sign(
      {
        username: res.locals.username,
        id: res.locals.userId,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    res.cookie("access_token", token, { httpOnly: true });
    return next();
  },
};

export default userController;
