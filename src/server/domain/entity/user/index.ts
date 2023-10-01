import { Expose } from "class-transformer";
import BaseEntity from "../base";
import { User } from "@prisma/client";

export default class UserEntity extends BaseEntity implements User {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly emailVerified: Date | null;
  @Expose()
  readonly image: string | null;
  @Expose()
  readonly createdAt: Date;
  @Expose()
  readonly updatedAt: Date;
}
