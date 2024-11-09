import { Moviments, ProductStreets } from "@prisma/client";
import { z } from "zod";
import { movimentHistorySchema } from "../history/schemas";

export const productSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(255),
  categoryId: z.number().positive().int(),
  quantity: z.number().positive().int(),
  street: z.nativeEnum(ProductStreets),
  minLimitItens: z.number().positive().int(),
  maxLimitItens: z.number().positive().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const productCreateSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const productUpdateSchema = productCreateSchema
  .omit({
    quantity: true,
  })
  .partial();

export const sendProductSchema = movimentHistorySchema.omit({
  id: true,
  accountId: true,
  movimentTime: true,
});

export const shopingSchema = z.object({
  id: z.number().positive().int(),
  productId: z.number().positive().int(),
  quantity: z.number().positive().int(),
  movimentType: z.nativeEnum(Moviments),
  requestTime: z.date(),
  userId: z.number().positive().int(),
  manegerId: z.number().positive().int(),
  aproved: z.boolean().default(false),
  rejected: z.boolean().default(false),
});

export const requestProductSchema = shopingSchema.omit({
  id: true,
  requestTime: true,
  aproved: true,
});
