import { Expose, Type } from "class-transformer";

import BaseEntity from "../base";
import TagEntity from "../tag";

export default class ContributeEntity extends BaseEntity {
  @Expose()
  id: number | null;
  @Expose()
  userId: number;
  @Expose()
  title: string;
  @Expose()
  content: string;
  @Expose()
  status: string;
  @Expose()
  identityCode: string;
  @Expose()
  publishedAt: Date | null;
  @Expose()
  lastEditedAt: Date | null;
  @Expose()
  @Type(() => TagEntity)
  tags: TagEntity[];
}
