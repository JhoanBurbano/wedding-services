import { Request, Response, NextFunction } from "express";
import { fieldsToBD } from "../utils";

export function cleanBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body = fieldsToBD(req.body);
  next();
}
