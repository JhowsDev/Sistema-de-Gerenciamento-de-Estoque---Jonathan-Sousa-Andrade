import { Request, Response } from "express";
import { ICategoryService } from "./interfaces";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryController {
  constructor(
    @inject("CategoryService") private categoryService: ICategoryService
  ) {}

  public create = async (req: Request, res: Response) => {
    const category = await this.categoryService.create(req.body);

    return res.status(201).json(category);
  };

  public findAll = async (req: Request, res: Response) => {
    const categorys = await this.categoryService.findAll();

    return res.status(200).json(categorys);
  };

  public findById = async (req: Request, res: Response) => {
    const category = await this.categoryService.findById(Number(req.params.id));

    return res.status(200).json(category);
  };

  public partialUpdate = async (req: Request, res: Response) => {
    const categorys = await this.categoryService.partialUpdate(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(categorys);
  };

  public delete = async (req: Request, res: Response) => {
    await this.categoryService.delete(Number(req.params.id));
  };
}
