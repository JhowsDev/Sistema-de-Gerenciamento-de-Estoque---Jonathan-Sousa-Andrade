import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { initRoutes } from "./routes";
import { handleGlobalErrors } from "./api/@shared/errors";
import cors from "cors";

export const app = express();

// WHITELIST -> Posso definir quais dominios a minha api aceita receber requisições (se for necessario)
// Por padrão, quando definido o cors, ela aceitará de qualquer dominio
app.use(cors());
app.use(express.json());

initRoutes(app);

app.use(handleGlobalErrors);
