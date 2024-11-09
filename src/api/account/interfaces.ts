import { z } from "zod";
import {
  accountSchema,
  accountCreateSchema,
  accountUpdateSchema,
  accountWithoutPasswordSchema,
} from "./schemas";

export type Account = z.infer<typeof accountSchema>;

export type AccountCreate = z.infer<typeof accountCreateSchema>;

export type AccountUpdate = z.infer<typeof accountUpdateSchema>;

export type accountWithoutPassword = z.infer<
  typeof accountWithoutPasswordSchema
>;

export interface IAccountService {
  findByEmail(email: string): Promise<accountWithoutPassword>;
  create(payload: AccountCreate): Promise<accountWithoutPassword>;
  findAll(): Promise<accountWithoutPassword[]>;
  findById(is: number): Promise<accountWithoutPassword>;
  partialUpdate(
    id: number,
    payload: AccountUpdate
  ): Promise<accountWithoutPassword>;
  delete(id: number): Promise<void>;
}
