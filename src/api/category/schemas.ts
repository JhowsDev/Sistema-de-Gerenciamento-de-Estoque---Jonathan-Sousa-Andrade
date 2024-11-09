import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().positive().int(),
  nameCategory: z.string().max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const categoryCreateSchema = categorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const categoryUpdateSchema = categoryCreateSchema.partial();
