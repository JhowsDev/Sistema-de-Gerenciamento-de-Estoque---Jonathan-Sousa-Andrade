import { Router } from "express";
import { ProductController } from "./controller";
import { validateBody } from "../@shared/validators";
import { isAuthenticated } from "../session/middlewares";
import { ProductService } from "./service";
import { container } from "tsyringe";
import {
  productCreateSchema,
  productDeleteShema,
  productOutputSchema,
  productUpdateSchema,
  requestAprovateSchema,
  requestProductSchema,
} from "./schemas";
import { isManeger, isStokist, isUser } from "./middlewares";
import { movimentHistoryCreateSchema } from "../history/schemas";

export const productRouter = Router();

container.registerSingleton("ProductService", ProductService);
const productController = container.resolve(ProductController);

productRouter.post(
  "",
  isAuthenticated,
  isStokist,
  validateBody(productCreateSchema),
  productController.create
);

productRouter.get("", productController.findAll);

productRouter.get("/emergency", productController.findEmergencyProducts);

productRouter.get("/:id", productController.findById);

productRouter.patch(
  "/:id",
  isAuthenticated,
  isStokist,
  validateBody(productUpdateSchema),
  productController.partialUpdate
);

productRouter.delete(
  "/:id",
  isAuthenticated,
  isStokist,
  validateBody(productDeleteShema),
  productController.delete
);

productRouter.post(
  "/output/:id",
  isAuthenticated,
  isStokist,
  validateBody(productOutputSchema),
  productController.productOutput
);

productRouter.post(
  "/request",
  isAuthenticated,
  isUser,
  validateBody(requestProductSchema),
  productController.requestProduct
);

productRouter.get(
  "/request/all",
  isAuthenticated,
  productController.findAllRequests
);

productRouter.get(
  "/request/unique/:id",
  isAuthenticated,
  productController.findRquestById
);

productRouter.post(
  "/request/aprove/:id",
  isAuthenticated,
  isManeger,
  validateBody(requestAprovateSchema),
  productController.aproveRequest
);

productRouter.post(
  "/request/reprove/:id",
  isAuthenticated,
  isManeger,
  validateBody(requestAprovateSchema),
  productController.reproveRequest
);
