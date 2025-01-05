import dayjs from "dayjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { ContributeFactory } from "@server/domain/factory/contribute";
import ContributeEntity, {
  CONTRIBUTE_STATUS,
} from "@server/domain/entity/contribute";
import { PrismaFindManyQuery, PrismaFindUniqueQuery } from "../prisma/query";
import RepositoryBase from "../base";

// TODO: ここに置いておくのが適切か検討して必要であれば移す
const contributeWithInformation =
  Prisma.validator<Prisma.ContributeDefaultArgs>()({
    include: { details: true, tags: { include: { tag: true } }, user: true },
  });
type ContributeWithInformation = Prisma.ContributeGetPayload<
  typeof contributeWithInformation
>;
const DEFAULT_LIMIT = 100;

export interface GetManyContributesParam {
  status?: string;
  limit?: number;
  offset?: number;
}

export interface CreateContributeParam {
  userId: string;
  title: string;
  content: string;
}

export interface UpdateContributeParam {
  contributeId: number;
  title: string;
  content: string;
}

abstract class IContributeRepository {
  abstract getAll: (
    params: GetManyContributesParam,
  ) => Promise<ContributeEntity[]>;
  abstract getByIdentityCode: (
    identityCode: string,
  ) => Promise<ContributeEntity | null>;
  abstract create: (
    contribute: CreateContributeParam,
  ) => Promise<ContributeEntity>;
  abstract updateContent: (
    contribute: ContributeEntity,
  ) => Promise<ContributeEntity>;
  abstract updateStatus: (
    contribute: ContributeEntity,
  ) => Promise<ContributeEntity>;
}

const contributeFactory = new ContributeFactory();

export default class ContributeRepository
  extends RepositoryBase
  implements IContributeRepository
{
  constructor(db?: PrismaClient) {
    super(db);
  }

  public getAll = async (
    params?: GetManyContributesParam,
  ): Promise<ContributeEntity[]> => {
    const query: PrismaFindManyQuery = {
      ...this.getBaseQuery(),
      orderBy: [{ publishedAt: "desc" }],
      take: params?.limit || DEFAULT_LIMIT,
      skip: params?.offset || 0,
    };

    if (params?.status) {
      query.where.status = params.status;
    }

    const contributes = await this.db.contribute.findMany(query);
    return contributeFactory.reconstructList(
      contributes as ContributeWithInformation[],
    );
  };

  public getByIdentityCode = async (
    identityCode: string,
  ): Promise<ContributeEntity | null> => {
    const query: PrismaFindUniqueQuery = {
      ...this.getBaseQuery(),
      where: { identityCode },
    };

    if (!identityCode) {
      return null;
    }

    const contribute = await this.db.contribute.findUnique(query);
    return contribute
      ? contributeFactory.reconstruct(contribute as ContributeWithInformation)
      : null;
  };

  public create = async (
    contribute: CreateContributeParam,
  ): Promise<ContributeEntity> => {
    const _contribute = await this.db.contribute.create({
      data: {
        status: CONTRIBUTE_STATUS.DRAFT,
        userId: contribute.userId,
        identityCode: contributeFactory.generateIdentityCode(),
        details: {
          create: {
            title: contribute.title,
            content: contribute.content,
          },
        },
      },
    });

    const createdContribute = await this.getByIdentityCode(
      _contribute.identityCode,
    );

    if (!createdContribute) {
      throw new Error("投稿データの作成時に予期せぬエラーが発生しました。");
    }

    return createdContribute;
  };

  public updateContent = async (contribute: ContributeEntity) => {
    // コンテンツの更新
    await this.db.contributeDetail.update({
      where: { contributeId: contribute.id },
      data: {
        title: contribute.title,
        content: contribute.content,
      },
    });
    // 最終更新日の更新
    await this.db.contribute.update({
      where: { id: contribute.id },
      data: {
        lastEditedAt: dayjs().format(),
      },
    });

    const updatedContribute = await this.getByIdentityCode(
      contribute.identityCode,
    );
    if (!updatedContribute) {
      throw new Error("投稿データの更新時に予期せぬエラーが発生しました。");
    }
    return updatedContribute;
  };

  public updateStatus = async (
    contribute: ContributeEntity,
  ): Promise<ContributeEntity> => {
    const updateContributeData = await this.db.contribute.update({
      where: { id: contribute.id },
      data: {
        status: contribute.status,
        publishedAt: contribute.publishedAt,
      },
    });
    const updatedContribute = await this.getByIdentityCode(
      updateContributeData.identityCode,
    );
    if (!updatedContribute) {
      throw new Error("投稿データの更新時に予期せぬエラーが発生しました。");
    }

    return updatedContribute;
  };

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
            name: true,
            image: true,
          },
        },
      },
      where: {},
    };
  };
}
