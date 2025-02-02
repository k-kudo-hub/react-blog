import "reflect-metadata";

import { Expose, Type } from "class-transformer";
import BaseEntity from "../base";
import TagEntity from "../tag";
import UserEntity from "../user";
import CustomError from "../error";
import { Codes } from "@constants/http";

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

  isDraft() {
    return this.status === CONTRIBUTE_STATUS.DRAFT;
  }

  isDeleted() {
    return this.status === CONTRIBUTE_STATUS.DELETED;
  }

  publish() {
    if (!this.isDraft()) {
      throw new CustomError({
        message: "この記事はすでに公開されているか、削除されています。",
        statusCode: 400,
        code: Codes.BAD_REQUEST,
      });
    }

    this.status = CONTRIBUTE_STATUS.PUBLISHED;
    this.publishedAt = new Date();
  }

  delete() {
    if (this.isDeleted()) {
      throw new CustomError({
        message: "この記事はすでに削除されています。",
        statusCode: 400,
        code: Codes.BAD_REQUEST,
      });
    }

    this.status = CONTRIBUTE_STATUS.DELETED;
  }
}
