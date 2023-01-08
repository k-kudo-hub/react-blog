import ContributeRepository from "../../infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";
import CustomError from "@server/domain/entity/error";
import { StatusCodes, Codes } from "@constants/http";

export const getContribute = async (
  identityCode: string
): Promise<ContributeEntity> => {
  const tM = new TransactionManager();
  const contributeRepository = new ContributeRepository();

  if (!identityCode) {
    throw new CustomError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: Codes.BAD_REQUEST,
      message: "投稿IDを指定してください。",
    });
  }

  return await tM.execute(async (tx) => {
    return await contributeRepository.getByIdentityCode(tx, identityCode);
  });
};
