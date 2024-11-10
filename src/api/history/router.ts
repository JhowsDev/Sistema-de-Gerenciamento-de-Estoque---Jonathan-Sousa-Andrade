import { Router } from "express";
import { MovimentHistoryController } from "./controller";
import { container } from "tsyringe";
import { MovimentHistoryService } from "./service";
import { isAuthenticated, isManeger } from "./middlewares";

export const movimentHistoryRouter = Router();

container.registerSingleton("MovimentHistoryService", MovimentHistoryService);
const movimentHistoryController = container.resolve(MovimentHistoryController);

movimentHistoryRouter.get(
  "",
  isAuthenticated,
  isManeger,
  movimentHistoryController.findAll
);

movimentHistoryRouter.get(
  "/:id",
  isAuthenticated,
  isManeger,
  movimentHistoryController.findById
);
