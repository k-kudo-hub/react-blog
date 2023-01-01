import { Tag } from "../tag";

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
}
