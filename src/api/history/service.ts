import { injectable } from "tsyringe";
import { prisma } from "../../../prisma/prisma.client";
import { IMovimentHistoryService } from "./interfaces";
import { HistoryNotFound } from "./errors";

@injectable()
export class MovimentHistoryService implements IMovimentHistoryService {
  public findById = async (id: number) => {
    const history = await prisma.movimentHistory.findUnique({ where: { id } });

    if (!history) {
      throw new HistoryNotFound();
    }

    return history;
  };

  public findAll = async () => {
    const historys = await prisma.movimentHistory.findMany();

    return historys;
  };
}
