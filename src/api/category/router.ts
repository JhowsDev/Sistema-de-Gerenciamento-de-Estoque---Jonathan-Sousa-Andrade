import { Router } from "express";
import { CategoryController } from "./controller";
import { validateBody } from "../@shared/validators";
import { isAuthenticated } from "../session/middlewares";
import { CategoryService } from "./service";
import { container } from "tsyringe";
import { categoryCreateSchema, categoryUpdateSchema } from "./schemas";
import { isStokist } from "./middlewares";

export const categoryRouter = Router();

container.registerSingleton("CategoryService", CategoryService);
const categoryController = container.resolve(CategoryController);

categoryRouter.post(
  "",
  isAuthenticated,
  isStokist,
  validateBody(categoryCreateSchema),
  categoryController.create
);

categoryRouter.get("", categoryController.findAll);

categoryRouter.get("/:id", categoryController.findById);

categoryRouter.patch(
  "/:id",
  isAuthenticated,
  isStokist,
  validateBody(categoryUpdateSchema),
  categoryController.partialUpdate
);

categoryRouter.delete(
  "/:id",
  isAuthenticated,
  isStokist,
  categoryController.delete
);
