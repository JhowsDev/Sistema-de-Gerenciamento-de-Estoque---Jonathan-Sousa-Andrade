import { accountRouter } from "./api/account";
import { Express, Router } from "express";
import { sessionRouter } from "./api/session";
import { productRouter } from "./api/product/";
import { categoryRouter } from "./api/category";
import { movimentHistoryRouter } from "./api/history";

export function initRoutes(app: Express) {
  const v1Router = Router();

  v1Router.use("/v1/accounts", accountRouter);
  v1Router.use("/v1/login", sessionRouter);
  v1Router.use("/v1/products", productRouter);
  v1Router.use("/v1/categories", categoryRouter);
  v1Router.use("/v1/history", movimentHistoryRouter);

  app.use("/api", v1Router);
}
