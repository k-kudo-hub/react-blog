import ContributeRepository from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";

export const getAllContributes = async (): Promise<ContributeEntity[]> => {
  const tM = new TransactionManager();
  const contributeRepository = new ContributeRepository();

  return await tM.execute(async (tx) => {
    return await contributeRepository.getAll(tx);
  });
};
