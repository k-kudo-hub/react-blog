import { PrismaClient, Tag } from "@prisma/client";
import { ContributeType } from "../../../domain/entity/contribute";
import { IContributeRepository } from "src/server/domain/repository/contribute";

interface ContributeDataType {
  id: number;
  userId: number;
  title: string;
  content: string;
  status: string;
  tags: ContributeTagRelationDataType[];
  publishedAt: Date | null;
  lastEditedAt: Date | null;
}

interface ContributeTagRelationDataType {
  id: number;
  contributeId: number;
  tag: Tag;
  tagId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default class ContributeRepository extends IContributeRepository {
  public findAll = async (prisma: PrismaClient): Promise<ContributeType[]> => {
    const contributes = await prisma.contribute.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        content: true,
        lastEditedAt: true,
        publishedAt: true,
        status: true,
        tags: {
          include: { tag: true },
        },
      },
    });

    return contributes?.map((contribute: ContributeDataType) =>
      this.toDataObject(contribute)
    );
  };

  /**
   * @param contribute
   * @returns relationsを切り離したオブジェクト.
   */
  private toDataObject = (contribute: ContributeDataType): ContributeType => {
    const tags =
      contribute.tags?.map((tagRelation: ContributeTagRelationDataType) => {
        return tagRelation.tag;
      }) || [];
    return {
      ...contribute,
      tags,
    };
  };
}
