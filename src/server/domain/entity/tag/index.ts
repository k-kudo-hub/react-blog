import { Expose } from "class-transformer";
import BaseEntity from "../base";
import { Tag } from "@prisma/client";

export default class TagEntity extends BaseEntity implements Tag {
  @Expose()
  readonly id: number;
  @Expose()
  readonly name: string;
  @Expose()
  readonly description: string | null;
  @Expose()
  readonly createdAt: Date;
  @Expose()
  readonly updatedAt: Date;
}
