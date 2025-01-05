import { Expose, Type } from "class-transformer";

import BaseEntity from "../base";
import TagEntity from "../tag";
import UserEntity from "../user";

export const CONTRIBUTE_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  DELETED: "DELETED",
} as const;
export const CONTRIBUTE_STATUS_LIST = Object.values(CONTRIBUTE_STATUS);
export type ContributeStatus =
  (typeof CONTRIBUTE_STATUS)[keyof typeof CONTRIBUTE_STATUS];

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
    return this.status === CONTRIBUTE_STATUS.PUBLISHED;
  }

  isDeleted() {
    return this.status === CONTRIBUTE_STATUS.DELETED;
  }

  publish() {
    this.status = CONTRIBUTE_STATUS.PUBLISHED;
    this.publishedAt = new Date();
  }

  unpublish() {
    this.status = CONTRIBUTE_STATUS.DRAFT;
    this.publishedAt = null;
  }

  delete() {
    this.status = CONTRIBUTE_STATUS.DELETED;
  }
}
