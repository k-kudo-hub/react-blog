import { ContributeStatus } from "@server/domain/entity/contribute";
import { Tag } from "../tag";
import { User } from "../user";

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
