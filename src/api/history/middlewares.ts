import { NextFunction, Request, Response } from "express";
import { ApiError, ForbiddenError } from "../@shared/errors";
import { verifyToken } from "../../configs";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ApiError("Missing bearer token", 401);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new ApiError("Missing token Bearer prefix", 401);
  }

  res.locals.decodedToken = verifyToken(token);

  return next();
}

export function isManeger(req: Request, res: Response, next: NextFunction) {
  const { decodedToken } = res.locals;

  if (decodedToken.role !== "MANEGER") {
    throw new ForbiddenError();
  }

  return next();
}
