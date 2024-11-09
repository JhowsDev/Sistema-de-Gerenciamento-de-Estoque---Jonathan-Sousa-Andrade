import { Moviments } from "@prisma/client";
import { z } from "zod";

export const movimentHistorySchema = z.object({
  id: z.number().positive().int(),
  movimentType: z.nativeEnum(Moviments),
  accountId: z.number().positive().int(),
  quantity: z.number().positive().int(),
  movimentTime: z.date(),
});

export const movimentHistoryCreateSchema = movimentHistorySchema.omit({
  id: true,
  movimentTime: true,
});
