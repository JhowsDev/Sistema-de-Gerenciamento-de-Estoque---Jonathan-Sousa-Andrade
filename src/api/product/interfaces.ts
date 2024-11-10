import { z } from "zod";
import {
  requestProductSchema,
  productCreateSchema,
  productSchema,
  productUpdateSchema,
  shopingSchema,
  requestAprovateSchema,
  productDeleteShema,
  productOutputSchema,
} from "./schemas";

export type Product = z.infer<typeof productSchema>;
export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
export type ProductDelete = z.infer<typeof productDeleteShema>;
export type productOutput = z.infer<typeof productOutputSchema>;
export type Shoping = z.infer<typeof shopingSchema>;
export type RequestProduct = z.infer<typeof requestProductSchema>;
export type RequestAprovate = z.infer<typeof requestAprovateSchema>;

export interface IProductService {
  create(payload: ProductCreate): Promise<Product>;
  findAll(): Promise<Product[]>;
  findEmergencyProducts(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  partialUpdate(id: number, payload: ProductUpdate): Promise<Product>;
  delete(id: number, payload: ProductDelete): Promise<void>;
  productOutput(id: number, payload: productOutput): Promise<Product>;
  requestProduct(payload: RequestProduct): Promise<Shoping>;
  findRequests(): Promise<Shoping[]>;
  findRequestsById(id: number): Promise<Shoping>;
  aproveRequest(id: number, payload: RequestAprovate): Promise<Shoping>;
  reproveRequest(id: number, payload: RequestAprovate): Promise<Shoping>;
}
