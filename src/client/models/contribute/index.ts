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
  lastEditedAt: Date | null;
  lastEditedDate: string;
  publishedAt: Date | null;
  publishedDate: string;
  tags: Tag[];
  user: User;
}
