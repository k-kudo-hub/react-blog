import { Codes, StatusCodes } from "@constants/http";
import { PrismaClient } from "@prisma/client";
import CustomError from "@server/domain/entity/error";
import ContributeRepository from "@server/infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";

export const deleteContribute = async (identityCode: string): Promise<void> => {
  const tM = new TransactionManager();

  if (!identityCode) {
    throw new CustomError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: Codes.BAD_REQUEST,
      message: "投稿IDを指定してください。",
    });
  }

  return await tM.execute(async (tx: PrismaClient) => {
    const contributeRepository = new ContributeRepository(tx);
    const existContribute =
      await contributeRepository.getByIdentityCode(identityCode);

    if (!existContribute) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        code: Codes.BAD_REQUEST,
        message: "投稿が見つかりません。",
      });
    }

    if (existContribute.isDeleted()) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        code: Codes.BAD_REQUEST,
        message: "この投稿は既に削除されています。",
      });
    }

    existContribute.delete();
    return contributeRepository.updateStatus(existContribute);
  });
};
