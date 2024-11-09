import { prisma } from "../../../prisma/prisma.client";
import {
  IProductService,
  ProductCreate,
  ProductUpdate,
  RequestProduct,
} from "./interfaces";
import {
  CategoryNotFound,
  DuplicatedAprovadRequestConflict,
  ManegerNotFound,
  NotEnoughProductsConflict,
  ProductAlreadUsedError,
  ProductNotFound,
  RejectedRequestConflict,
  ShopingNotFound,
} from "./errors";
import { injectable } from "tsyringe";
import { MovimentHistoryCreate } from "../history/interfaces";
@injectable()
export class ProductService implements IProductService {
  public create = async (payload: ProductCreate) => {
    const hasDuplicatedProduct = await prisma.product.findFirst({
      where: { name: payload.name, categoryId: payload.categoryId },
    });

    if (hasDuplicatedProduct) {
      throw new ProductAlreadUsedError();
    }

    const AsCategory = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!AsCategory) {
      throw new CategoryNotFound();
    }

    const newProduct = await prisma.product.create({ data: payload });

    return newProduct;
  };

  public findAll = async () => {
    const products = await prisma.product.findMany();

    return products;
  };

  public findEmergencyProducts = async () => {
    const products = await prisma.product.findMany({});

    const emergencyProducts = products.filter((product) => {
      if (product.quantity > product.maxLimitItens) {
        return true;
      }

      return false;
    });

    return emergencyProducts;
  };

  public findById = async (id: number) => {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
  };

  public partialUpdate = async (id: number, payload: ProductUpdate) => {
    await this.findById(id);

    if (payload.name || payload.categoryId) {
      const hasDuplicatedProduct = await prisma.product.findFirst({
        where: { name: payload.name, categoryId: payload.categoryId },
      });

      if (hasDuplicatedProduct) {
        throw new ProductAlreadUsedError();
      }
    }

    const updatedProduct = await prisma.product.update({
      data: payload,
      where: { id },
    });

    return updatedProduct;
  };

  public delete = async (id: number) => {
    await this.findById(id);

    await prisma.product.delete({ where: { id } });
  };

  public sellProduct = async (id: number, payload: MovimentHistoryCreate) => {
    const product = await this.findById(id);

    const { quantity } = product;

    const newQuantity = quantity - payload.quantity;

    if (newQuantity < 0) {
      throw new NotEnoughProductsConflict();
    }

    const newProductQuantity = prisma.product.update({
      data: { quantity: newQuantity },
      where: { id },
    });

    await prisma.movimentHistory.create({ data: { ...payload } });

    return newProductQuantity;
  };

  public requestProduct = async (payload: RequestProduct) => {
    await this.findById(Number(payload.productId));

    const manegerExists = await prisma.maneger.findUnique({
      where: { id: payload.manegerId },
    });

    if (!manegerExists) {
      throw new ManegerNotFound();
    }

    const shoping = await prisma.shoping.create({ data: payload });

    return shoping;
  };

  public findShopings = async () => {
    const shopings = await prisma.shoping.findMany();

    return shopings;
  };

  public findShopingById = async (id: number) => {
    const shoping = await prisma.shoping.findUnique({ where: { id } });

    if (!shoping) {
      throw new ShopingNotFound();
    }

    return shoping;
  };

  public aproveShoping = async (id: number) => {
    const shoping = await this.findShopingById(id);
    const product = await this.findById(shoping.productId);

    if (shoping.rejected) {
      throw new RejectedRequestConflict();
    }

    if (shoping.aproved) {
      throw new DuplicatedAprovadRequestConflict();
    }

    const newQuantity = product.quantity + shoping.quantity;

    const newShoping = await prisma.shoping.update({
      where: { id },
      data: { aproved: true },
    });

    await prisma.product.update({
      where: { id: shoping.productId },
      data: { quantity: newQuantity },
    });

    const moviment = {
      movimentType: "ENTRIE",
      accountId: Number(shoping.userId),
      quantity: Number(shoping.quantity),
    } as MovimentHistoryCreate;

    await prisma.movimentHistory.create({ data: moviment });

    return newShoping;
  };

  public reproveShoping = async (id: number) => {
    const shoping = await prisma.shoping.findUnique({ where: { id } });

    if (!shoping) {
      throw new ProductNotFound();
    }

    return shoping;
  };
}
