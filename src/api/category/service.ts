import { prisma } from "../../../prisma/prisma.client";
import { CategoryCreate, CategoryUpdate, ICategoryService } from "./interfaces";
import { CategoryAlreadUsedError, CategoryNotFound } from "./errors";
import { injectable } from "tsyringe";

@injectable()
export class CategoryService implements ICategoryService {
  public create = async (payload: CategoryCreate) => {
    const hasDuplicatedCategory = await prisma.category.findFirst({
      where: { nameCategory: payload.nameCategory },
    });

    if (hasDuplicatedCategory) {
      throw new CategoryAlreadUsedError();
    }

    const newCategory = await prisma.category.create({ data: payload });

    return newCategory;
  };

  public findAll = async () => {
    const category = await prisma.category.findMany();

    return category;
  };

  public findById = async (id: number) => {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new CategoryNotFound();
    }

    return category;
  };

  public partialUpdate = async (id: number, payload: CategoryUpdate) => {
    await this.findById(id);

    if (payload.nameCategory) {
      const hasDuplicatedCategory = await prisma.category.findFirst({
        where: { nameCategory: payload.nameCategory },
      });

      if (hasDuplicatedCategory) {
        throw new CategoryAlreadUsedError();
      }
    }

    const updatedCategory = await prisma.category.update({
      data: payload,
      where: { id },
    });

    return updatedCategory;
  };

  public delete = async (id: number) => {
    await this.findById(id);

    await prisma.category.delete({ where: { id } });
  };
}
