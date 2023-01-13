import { RequestResponseNext } from "../types";
import db from "../database/dbModel";
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

interface UserController {
  registerNewUser: RequestResponseNext;
  verifyUser: RequestResponseNext;
  assignJWT: RequestResponseNext;
  verifyJWT: RequestResponseNext;
}

const userController: UserController = {
  registerNewUser: async (req, res, next) => {
    try {
      const { username, plainPassword } = req.body;

      if (!username || !plainPassword) {
        return next({
          log: null,
          status: 400,
          message: "Enter a valid username and/or password",
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

  verifyUser: async (req, res, next) => {
    try {
      const { username, plainPassword } = req.body;

      if (!username || !plainPassword) {
        return next({
          log: null,
          message: "Please enter your username and/or password",
        });
      }
      let userInDatabase;
      try {
        const checkIfUsernameExistsText =
          "SELECT * FROM users WHERE username = $1";
        const checkIfUsernameExistsValues = [username];
        userInDatabase = await db.query(
          checkIfUsernameExistsText,
          checkIfUsernameExistsValues
        );
      } catch {
        return next({
          log: null,
          status: 401,
          message: "Invalid username or password",
        });
      }

      if (userInDatabase.rows[0]) {
        const validPassword = await bcrypt.compare(
          plainPassword,
          userInDatabase.rows[0].password
        );
        if (validPassword) {
          res.locals.username = userInDatabase.rows[0].username;
          res.locals.userId = userInDatabase.rows[0].id;
        } else {
          return next({
            log: "null",
            status: 401,
            message: "Invalid username and/or password",
          });
        }
      } else {
        return next({
          log: "null",
          status: 401,
          message: "Invalid username and/or password",
        });
      }
      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.verifyUser ${error}`,
        status: 400,
        message: `Error has occured in userController.verifyUser. ERROR: invalid username and/or password ${error}`,
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

  verifyJWT: async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
      return next({
        status: 401,
        message: "Unauthorized request",
      });
    }

    const verified: any = await jwt.verify(token, JWT_SECRET as string);
    res.locals.userId = verified.id;
    res.locals.username = verified.username;

    return verified
      ? next()
      : next({ status: 403, message: "Unauthorized request" });
  },
};

export default userController;
