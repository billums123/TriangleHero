/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import triangleRouter from "./routes/triangle";

const app = express();
const PORT = process.env.PORT || 3000;

// parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve static files
app.use(express.static(path.resolve("../web/dist/assets")));

// routers
app.use("/api/user", userRouter);
app.use("/api/triangle", triangleRouter);

app.get("/", (req, res): void => {
  res.status(200).sendFile(path.resolve("../web/dist/index.html"));
});

// catch all 404
app.use("*", (req, res) => {
  return res.status(404).send("The page you are looking for does not exist.");
});

// global error object
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: `GLOBAL ERROR HANDLER: caught unknown middleware error${err.toString()}`,
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  if (errorObj.log) console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(PORT, () => {
  console.log(`**Server listening on port ${PORT}!**`);
});
