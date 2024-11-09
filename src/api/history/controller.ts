import { Request, Response } from "express";
import { IMovimentHistoryService } from "./interfaces";
import { inject, injectable } from "tsyringe";

@injectable()
export class MovimentHistoryController {
  constructor(
    @inject("MovimentHistoryService")
    private movimentHistoryService: IMovimentHistoryService
  ) {}
  public findAll = async (req: Request, res: Response) => {
    const categorys = await this.movimentHistoryService.findAll();

    return res.status(200).json(categorys);
  };

  public findById = async (req: Request, res: Response) => {
    const category = await this.movimentHistoryService.findById(
      Number(req.params.id)
    );

    return res.status(200).json(category);
  };
}
