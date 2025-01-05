import { Codes, StatusCodes } from "@constants/http";
import { PrismaClient } from "@prisma/client";
import ContributeEntity, {
  ContributeStatus,
} from "@server/domain/entity/contribute";
import CustomError from "@server/domain/entity/error";
import ContributeRepository from "@server/infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";

interface Params {
  identityCode: string;
  status: ContributeStatus;
}

export const publishContribute = async (
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

    if (existContribute.isPublished()) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        code: Codes.BAD_REQUEST,
        message: "この記事はすでに公開されています。",
      });
    }

    existContribute.publish();

    await contributeRepository.updateStatus(existContribute);
    return existContribute;
  });
};
