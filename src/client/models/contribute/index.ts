import { Tag } from "../tag";
import { User } from "../user";

export const contributeStatus = ["PUBLISHED", "DRAFT"] as const;
export type ContributeStatus = (typeof contributeStatus)[number];

export interface Contribute {
  id: number;
  userId: string;
  status: ContributeStatus;
  title: string;
  content: string;
  identityCode: string;
  lastEditedAt: string | null;
  publishedAt: string | null;
  tags: Tag[];
  user: User;
}
