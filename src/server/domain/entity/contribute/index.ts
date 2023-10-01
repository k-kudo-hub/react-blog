import { Expose, Type } from "class-transformer";

import BaseEntity from "../base";
import TagEntity from "../tag";
import UserEntity from "../user";
import { Contribute } from "@prisma/client";

export default class ContributeEntity extends BaseEntity implements Contribute {
  @Expose()
  id: number;
  @Expose()
  userId: string;
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
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  @Type(() => TagEntity)
  tags: TagEntity[];
  @Expose()
  @Type(() => UserEntity)
  user: UserEntity;
}
