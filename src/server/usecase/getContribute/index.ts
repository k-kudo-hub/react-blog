import ContributeRepository from "@server/infrastructure/repository/contribute";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import ContributeEntity from "@server/domain/entity/contribute";
import BadRequestError from "@server/domain/entity/error/BadRequestError";

export const getContribute = async (
  identityCode: string
): Promise<ContributeEntity> => {
  const tM = new TransactionManager();

  if (!identityCode) {
    throw new BadRequestError({
      serverMessage: `The contribute ID is not specified at getContribute.`,
      message: "投稿IDを指定してください。",
    });
  }

  return await tM.execute(async (tx) => {
    const contributeRepository = new ContributeRepository(tx);
    const contribute = await contributeRepository.getByIdentityCode(
      identityCode
    );

    if (!contribute) {
      throw new BadRequestError({
        serverMessage: `Contribute not found at getContribute.`,
        message:
          "投稿が見つかりませんでした。存在しないか、非公開もしくは削除された可能性があります。",
      });
    }

    return contribute;
  });
};
