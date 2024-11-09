import { z } from "zod";
import {
  categorySchema,
  categoryCreateSchema,
  categoryUpdateSchema,
} from "./schemas";

export type Category = z.infer<typeof categorySchema>;

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;

export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;

export interface ICategoryService {
  create(payload: CategoryCreate): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(is: number): Promise<Category>;
  partialUpdate(id: number, payload: CategoryUpdate): Promise<Category>;
  delete(id: number): Promise<void>;
}
