import ContributeRepository from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity, {
  CONTRIBUTE_STATUS,
} from "@server/domain/entity/contribute";
import { PrismaClient } from "@prisma/client";

export const getAllContributes = async (): Promise<ContributeEntity[]> => {
  const tM = new TransactionManager();

  return await tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    return await contributeRepository.getAll({
      status: CONTRIBUTE_STATUS.PUBLISHED,
    });
  });
};
