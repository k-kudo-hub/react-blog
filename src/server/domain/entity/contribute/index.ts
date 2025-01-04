import { Expose, Type } from "class-transformer";

import BaseEntity from "../base";
import TagEntity from "../tag";
import UserEntity from "../user";

export default class ContributeEntity extends BaseEntity {
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
  @Type(() => TagEntity)
  tags: TagEntity[];
  @Expose()
  @Type(() => UserEntity)
  user: UserEntity;

  isPublished() {
    return this.status === "PUBLISHED";
  }

  publish() {
    this.status = "PUBLISHED";
    this.publishedAt = new Date();
  }

  unpublish() {
    this.status = "DRAFT";
    this.publishedAt = null;
  }
}
