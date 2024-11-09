import { NextFunction, Request, Response, request, response } from "express";
import { ForbiddenError } from "../@shared/errors";

export function isAccountOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accountIdParam = req.params.id;

  // TODO: Ajustar lógica, agora no res.locals temos o payload inteiro do JWT
  const { decodedToken } = res.locals;

  if (accountIdParam !== decodedToken.sub) {
    throw new ForbiddenError();
  }

  return next();
}
