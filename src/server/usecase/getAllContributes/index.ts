import ContributeRepository, {
  GetManyContributesParam,
} from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";
import { PrismaClient } from "@prisma/client";

export const getAllContributes = async (
  params?: GetManyContributesParam,
): Promise<ContributeEntity[]> => {
  const tM = new TransactionManager();

  return await tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    return await contributeRepository.getAll(params);
  });
};
