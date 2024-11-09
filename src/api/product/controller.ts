import { Request, Response } from "express";
import { IProductService } from "./interfaces";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductController {
  constructor(
    @inject("ProductService") private productService: IProductService
  ) {}

  public create = async (req: Request, res: Response) => {
    const product = await this.productService.create(req.body);

    return res.status(201).json(product);
  };

  public findAll = async (req: Request, res: Response) => {
    const products = await this.productService.findAll();

    return res.status(200).json(products);
  };

  public findEmergencyProducts = async (req: Request, res: Response) => {
    const products = await this.productService.findEmergencyProducts();

    return res.status(200).json(products);
  };

  public findById = async (req: Request, res: Response) => {
    const product = await this.productService.findById(Number(req.params.id));

    return res.status(200).json(product);
  };

  public partialUpdate = async (req: Request, res: Response) => {
    const products = await this.productService.partialUpdate(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(products);
  };

  public delete = async (req: Request, res: Response) => {
    await this.productService.delete(Number(req.params.id));
  };

  public sellProduct = async (req: Request, res: Response) => {
    const product = await this.productService.sellProduct(
      Number(req.params.id),
      req.body
    );

    res.status(201).json(product);
  };

  public requestProduct = async (req: Request, res: Response) => {
    const request = await this.productService.requestProduct(req.body);

    res.status(201).json(request);
  };

  public aproveShoping = async (req: Request, res: Response) => {
    const request = await this.productService.aproveShoping(
      Number(req.params.id)
    );

    res.status(201).json(request);
  };
}