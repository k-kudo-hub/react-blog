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

// TODO: 作成と更新の責務を持ってしまっているので分ける
export const createContribute = async ({
  contribute,
}: {
  contribute: ContributeParam;
}): Promise<ContributeEntity> => {
  const tM = new TransactionManager();

  return tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    const existContribute = await contributeRepository.getByIdentityCode(
      contribute.identityCode,
    );

    if (existContribute?.id) {
      existContribute.title = contribute.title;
      existContribute.content = contribute.content;
      await contributeRepository.updateDetail(existContribute);
      return existContribute;
    } else {
      return contributeRepository.create(contribute);
    }
  });
};
