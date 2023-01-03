import { Expose } from "class-transformer";
import BaseEntity from "../base";

export default class UserEntity extends BaseEntity {
  @Expose()
  id: number | null;
  @Expose()
  nickName: string;
}
