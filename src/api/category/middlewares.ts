import { NextFunction, Request, Response, request, response } from "express";
import { ForbiddenError } from "../@shared/errors";

export function isStokist(req: Request, res: Response, next: NextFunction) {
  const { decodedToken } = res.locals;

  if (decodedToken.role !== "STOCKIST") {
    throw new ForbiddenError();
  }

  req.body.createdById = Number(decodedToken.sub);

  return next();
}
