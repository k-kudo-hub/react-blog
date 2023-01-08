import { PrismaClient } from "@prisma/client";
import { ContributeFactory } from "@server/domain/factory/contribute";
import ContributeEntity from "@server/domain/entity/contribute";
import prisma from "../prisma";
import { PrismaQuery } from "../prisma/query";

abstract class IContributeRepository {
  abstract getAll: (transaction: PrismaClient) => Promise<ContributeEntity[]>;
  abstract getByIdentityCode: (
    transaction: PrismaClient,
    identityCode: string
  ) => Promise<ContributeEntity>;
}

const contributeFactory = new ContributeFactory();

export default class ContributeRepository extends IContributeRepository {
  public getAll = async (
    transaction: PrismaClient | null
  ): Promise<ContributeEntity[]> => {
    const db = transaction ? transaction : prisma;
    const query = this.getBaseQuery();
    query.orderBy = [{ lastEditedAt: "desc" }, { id: "desc" }];

    const contributes = await db.contribute.findMany(query);
    return contributeFactory.reconstructList(contributes);
  };

  public getByIdentityCode = async (
    transaction: PrismaClient | null,
    identityCode: string
  ): Promise<ContributeEntity> => {
    const db = transaction ? transaction : prisma;
    const query = this.getBaseQuery();
    query.where = {
      identityCode: identityCode,
    };
    query.select = {
      ...query.select,
      details: {
        select: {
          content: true,
        },
      },
    };

    const contribute = await db.contribute.findUnique(query);
    return contributeFactory.reconstruct(contribute);
  };

  private getBaseQuery = (): PrismaQuery => {
    return {
      select: {
        id: true,
        title: true,
        userId: true,
        lastEditedAt: true,
        publishedAt: true,
        identityCode: true,
        status: true,
        tags: {
          include: { tag: true },
        },
        user: {
          select: {
            id: true,
            nickName: true,
          },
        },
      },
    };
  };
}
