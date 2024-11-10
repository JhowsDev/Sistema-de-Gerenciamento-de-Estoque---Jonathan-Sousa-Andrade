import { NextFunction, Request, Response, request, response } from "express";
import { ForbiddenError } from "../@shared/errors";

export function isStokist(req: Request, res: Response, next: NextFunction) {
  const { decodedToken } = res.locals;

  if (decodedToken.role !== "STOCKIST") {
    throw new ForbiddenError();
  }

  req.body.createdById = Number(decodedToken.sub);
  req.body.movimentType = "EXIT";

  return next();
}

export function isUser(req: Request, res: Response, next: NextFunction) {
  const { decodedToken } = res.locals;

  if (decodedToken.role !== "USER") {
    throw new ForbiddenError();
  }

  req.body.userId = Number(decodedToken.sub);
  req.body.movimentType = "ENTRIE";

  return next();
}

export function isManeger(req: Request, res: Response, next: NextFunction) {
  const { decodedToken } = res.locals;

  if (decodedToken.role !== "MANEGER") {
    throw new ForbiddenError();
  }

  req.body.userId = Number(decodedToken.sub);

  req.body = decodedToken;

  return next();
}
