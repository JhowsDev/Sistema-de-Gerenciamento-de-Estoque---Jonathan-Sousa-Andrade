import { z } from "zod";
import { movimentHistoryCreateSchema, movimentHistorySchema } from "./schemas";

export type MovimentHistory = z.infer<typeof movimentHistorySchema>;

export type MovimentHistoryCreate = z.infer<typeof movimentHistoryCreateSchema>;

export interface IMovimentHistoryService {
  findById(id: number): Promise<MovimentHistory>;
  findAll(): Promise<MovimentHistory[]>;
}
