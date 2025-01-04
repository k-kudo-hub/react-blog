import { Codes, StatusCodes } from "@constants/http";
import { PrismaClient } from "@prisma/client";
import ContributeEntity from "@server/domain/entity/contribute";
import CustomError from "@server/domain/entity/error";
import ContributeRepository from "@server/infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import { ContributeStatus } from "src/client/models/contribute";

interface Params {
  identityCode: string;
  status: ContributeStatus;
}

export const updateContributeStatus = async (
  params: Params,
): Promise<ContributeEntity> => {
  const tM = new TransactionManager();

  return tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    const existContribute = await contributeRepository.getByIdentityCode(
      params.identityCode,
    );

    if (!existContribute) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        code: Codes.BAD_REQUEST,
        message: "投稿が見つかりません。",
      });
    }

    existContribute.status = params.status;
    await contributeRepository.update(existContribute);
    return existContribute;
  });
};
