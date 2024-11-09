import { z } from "zod";
import {
  requestProductSchema,
  productCreateSchema,
  productSchema,
  productUpdateSchema,
  sendProductSchema,
  shopingSchema,
} from "./schemas";
import { MovimentHistoryCreate } from "../history/interfaces";

export type Product = z.infer<typeof productSchema>;
export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
export type SendProduct = z.infer<typeof sendProductSchema>;
export type Shoping = z.infer<typeof shopingSchema>;
export type RequestProduct = z.infer<typeof requestProductSchema>;

export interface IProductService {
  create(payload: ProductCreate): Promise<Product>;
  findAll(): Promise<Product[]>;
  findEmergencyProducts(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  partialUpdate(id: number, payload: ProductUpdate): Promise<Product>;
  delete(id: number): Promise<void>;
  sellProduct(id: number, payload: MovimentHistoryCreate): Promise<Product>;
  requestProduct(payload: RequestProduct): Promise<Shoping>;
  findShopings(): Promise<Shoping[]>;
  findShopingById(id: number): Promise<Shoping>;
  aproveShoping(id: number): Promise<Shoping>;
  reproveShoping(id: number): Promise<Shoping>;
}
