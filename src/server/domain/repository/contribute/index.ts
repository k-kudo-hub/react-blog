import { PrismaClient, Tag } from "@prisma/client";

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

export default class ContributeRepository {
  public findAll = async (prisma: PrismaClient) => {
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

  private toDataObject = (contribute: ContributeDataType) => {
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
