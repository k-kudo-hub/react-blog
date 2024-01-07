import { Expose } from "class-transformer";
import BaseEntity from "../base";

export default class UserEntity extends BaseEntity {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly image: string | null;
}
