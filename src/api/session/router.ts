import { Router } from "express";
import { SessionController } from "./controller";

export const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("", sessionController.login);
