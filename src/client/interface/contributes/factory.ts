import { ContributeStatus } from "@server/domain/entity/contribute";
import dayjs from "dayjs";
import { Tag } from "src/client/models/tag";
import { User } from "src/client/models/user";

export interface ContributeApiResponse {
  id: number;
  userId: string;
  status: ContributeStatus;
  title: string;
  content: string;
  identityCode: string;
  lastEditedAt: Date | null;
  publishedAt: Date | null;
  tags: Tag[];
  user: User;
}

export const createContributeFromResponse = (data: ContributeApiResponse) => {
  return {
    ...data,
    lastEditedDate: data.lastEditedAt
      ? dayjs(data.lastEditedAt).format("YYYY年MM月DD日")
      : "",
    publishedDate: data.publishedAt
      ? dayjs(data.publishedAt).format("YYYY年MM月DD日")
      : "",
  };
};

export const createContributeListFromResponse = (
  data: ContributeApiResponse[],
) => {
  return data.map((item) => createContributeFromResponse(item));
};
