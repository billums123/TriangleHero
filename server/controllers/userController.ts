import { RequestResponseNext } from "../types";
import db from "../database/dbModel";
const bcrypt = require("bcryptjs");
// import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

// environmental variables
dotenv.config();
const { JWT_SECRET } = process.env;

const url =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

interface UserController {
  registerNewUser: RequestResponseNext;
}

const userController: UserController = {
  registerNewUser: async (req, res, next) => {
    try {
      console.log("BODY", req.body);
      const { username, plainPassword } = req.body;

      if (!username || !plainPassword) {
        return next({
          log: null,
          status: 400,
          message: "Enter a valid username, email, and/or password",
        });
      }
      const passwordHash = await bcrypt.hash(plainPassword, 10);
      console.log("PassyPass", plainPassword);
      console.log("HASHBROWNS", passwordHash);
    } catch (error) {
      return next({
        log: `Error caught in userController.registerNewUser ${error}`,
        status: 409,
        message: "User already exists!",
      });
    }
  },
};

export default userController;
