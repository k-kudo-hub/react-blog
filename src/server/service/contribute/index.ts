import { Tag } from "@prisma/client";
import { ContributeFormatted } from "../../domain/model/contribute";
import dayjs from "dayjs";

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
    const lastEditedAt = contribute.lastEditedAt
      ? dayjs(contribute.lastEditedAt).format("YYYY.MM.DD")
      : "";
    const publishedAt = contribute.publishedAt
      ? dayjs(contribute.publishedAt).format("YYYY.MM.DD")
      : "";
    return {
      ...contribute,
      tags,
      lastEditedAt,
      publishedAt,
    };
  });

  return contributes;
};
