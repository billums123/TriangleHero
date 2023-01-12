import { RequestHandler } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";

export type RequestResponseNext = RequestHandler<
  ParamsDictionary,
  any,
  any,
  Query
>;
