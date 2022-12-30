import { PrismaClient } from "@prisma/client";
import { IContributeRepository } from "src/server/domain/repository/contribute";
import { ContributeFactory } from "@server/domain/factory/contribute";
import ContributeEntity from "@server/domain/entity/contribute";
import CustomError from "@server/domain/entity/error";
import prisma from "../prisma";

const contributeFactory = new ContributeFactory();

export default class ContributeRepository extends IContributeRepository {
  public findAll = async (
    transaction: PrismaClient | null
  ): Promise<ContributeEntity[]> => {
    const db = transaction ? transaction : prisma;
    const contributes = await db.contribute.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        content: true,
        lastEditedAt: true,
        publishedAt: true,
        status: true,
        tags: {
          include: { tag: true },
        },
      },
    });

    return contributeFactory.reconstructList(contributes);
  };
}
