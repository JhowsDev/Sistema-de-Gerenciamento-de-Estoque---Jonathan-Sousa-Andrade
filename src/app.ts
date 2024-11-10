import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { initRoutes } from "./routes";
import { handleGlobalErrors } from "./api/@shared/errors";
import cors from "cors";
import helmet from "helmet";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

initRoutes(app);

app.use(handleGlobalErrors);
