import { Prisma, PrismaClient } from "@prisma/client";
import { ContributeFactory } from "@server/domain/factory/contribute";
import ContributeEntity from "@server/domain/entity/contribute";
import { PrismaFindManyQuery, PrismaFindUniqueQuery } from "../prisma/query";
import RepositoryBase from "../base";

// TODO: ここに置いておくのが適切か検討して必要であれば移す
const contributeWithInformation = Prisma.validator<Prisma.ContributeArgs>()({
  include: { details: true, tags: { include: { tag: true } }, user: true },
});
type ContributeWithInformation = Prisma.ContributeGetPayload<
  typeof contributeWithInformation
>;

abstract class IContributeRepository {
  abstract getAll: () => Promise<ContributeEntity[]>;
  abstract getByIdentityCode: (
    identityCode: string
  ) => Promise<ContributeEntity | null>;
}

const contributeFactory = new ContributeFactory();

export default class ContributeRepository
  extends RepositoryBase
  implements IContributeRepository
{
  constructor(db?: PrismaClient) {
    super(db);
  }

  public getAll = async (): Promise<ContributeEntity[]> => {
    const query: PrismaFindManyQuery = this.getBaseQuery();
    query.orderBy = [{ lastEditedAt: "desc" }, { id: "desc" }];

    const contributes = await this.db.contribute.findMany(query);
    return contributeFactory.reconstructList(
      contributes as ContributeWithInformation[]
    );
  };

  public getByIdentityCode = async (
    identityCode: string
  ): Promise<ContributeEntity | null> => {
    const query: PrismaFindUniqueQuery = this.getBaseQuery();
    query.where = {
      identityCode: identityCode,
    };

    const contribute = await this.db.contribute.findUnique(query);
    return contribute
      ? contributeFactory.reconstruct(contribute as ContributeWithInformation)
      : null;
  };

  // any型にしなければprisma側の型と適合しなかったのでやむなくany
  private getBaseQuery = () => {
    return {
      include: {
        details: {
          select: {
            title: true,
            content: true,
          },
        },
        tags: {
          include: { tag: true },
        },
        user: {
          select: {
            id: true,
            nickName: true,
          },
        },
      },
      where: {},
    };
  };
}
