import { Tag } from "@prisma/client";

export interface ContributeType {
  id: number;
  userId: number;
  title: string;
  tags: Tag[];
  content: string;
  status: string;
  publishedAt: Date | null;
  lastEditedAt: Date | null;
}

export interface ContributeDataType {
  id: number;
  userId: number;
  status: string;
  identityCode: string;
  tags: ContributeTagRelationDataType[];
  details: {
    title: string;
    content: string;
  } | null;
  user: {
    nickName: string;
  };
  publishedAt: Date | null;
  lastEditedAt: Date | null;
}

export interface ContributeTagRelationDataType {
  id: number;
  contributeId: number;
  tag: Tag;
  tagId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContributeDetailDataType {
  id: number;
  contributeId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
