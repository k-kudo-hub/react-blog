import { Tag } from "../tag";
import { User } from "../user";

export interface Contribute {
  id: number;
  userId: number;
  status: string;
  title: string;
  content: string;
  identityCode: string;
  lastEditedAt: string | null;
  publishedAt: string | null;
  tags: Tag[];
  user: User;
}
