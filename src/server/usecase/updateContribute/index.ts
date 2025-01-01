import ContributeRepository from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";
import { PrismaClient } from "@prisma/client";
import CustomError from "@server/domain/entity/error";
import { Codes, StatusCodes } from "@constants/http";

export interface ContributeParam {
  identityCode: string;
  title: string;
  content: string;
}

export const updateContribute = async (
  contribute: ContributeParam,
): Promise<ContributeEntity> => {
  const tM = new TransactionManager();

  return tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    const existContribute = await contributeRepository.getByIdentityCode(
      contribute.identityCode,
    );

    if (!existContribute) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        code: Codes.BAD_REQUEST,
        message: "投稿が見つかりません。",
      });
    }

    existContribute.title = contribute.title;
    existContribute.content = contribute.content;
    await contributeRepository.update(existContribute);
    return existContribute;
  });
};
