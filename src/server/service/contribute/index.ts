import { Tag } from "@prisma/client";
import { ContributeFormatted } from "../../domain/model/contribute";

interface ContributeDataType {
  id: number;
  userId: number;
  title: string;
  content: string;
  status: string;
  tags: ContributeTagRelationDataType[];
  publishedAt: Date | null;
  lastEditedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ContributeTagRelationDataType {
  id: number;
  contributeId: number;
  tag: Tag;
  tagId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const formatContributes = (contributesData: ContributeDataType[]) => {
  const contributes = contributesData.map((contribute: ContributeDataType) => {
    const tags =
      contribute.tags?.map((tagRelation: ContributeTagRelationDataType) => {
        return tagRelation.tag;
      }) || [];
    return {
      ...contribute,
      tags: tags,
    };
  });

  return contributes;
};
