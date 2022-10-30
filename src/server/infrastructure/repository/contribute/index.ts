import { PrismaClient, Tag } from "@prisma/client";
import { IContributeRepository } from "src/server/domain/repository/contribute";
import { ContributeFactory } from "@server/domain/factory/contribute";
import ContributeEntity from "@server/domain/entity/contribute";

const contributeFactory = new ContributeFactory();

export default class ContributeRepository extends IContributeRepository {
  public findAll = async (
    prisma: PrismaClient
  ): Promise<ContributeEntity[]> => {
    const contributes = await prisma.contribute.findMany({
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
