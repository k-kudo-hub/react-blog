import ContributeRepository, {
  CreateContributeParam,
} from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";
import { PrismaClient } from "@prisma/client";

export interface ContributeParam {
  identityCode: string;
  title: string;
  content: string;
  userId: string;
}

export const createContribute = async (
  contribute: ContributeParam,
): Promise<ContributeEntity[]> => {
  const tM = new TransactionManager();

  return await tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    const existContribute = await contributeRepository.getByIdentityCode(
      contribute.identityCode,
    );

    if (existContribute?.id) {
      await contributeRepository.updateDetail({
        contributeId: existContribute.id,
        title: contribute.title,
        content: contribute.content,
      });
      return contributeRepository.getByIdentityCode(
        existContribute.identityCode,
      );
    } else {
      return contributeRepository.create(contribute);
    }
  });
};
