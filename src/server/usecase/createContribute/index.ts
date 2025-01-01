import ContributeRepository from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";
import { PrismaClient } from "@prisma/client";

export interface ContributeParam {
  identityCode: string;
  title: string;
  content: string;
  userId: string;
}

export const createContribute = async ({
  contribute,
}: {
  contribute: ContributeParam;
}): Promise<ContributeEntity> => {
  const tM = new TransactionManager();

  return tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    return contributeRepository.create(contribute);
  });
};
