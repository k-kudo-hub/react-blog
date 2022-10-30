import { Expose, Type } from "class-transformer";
import BaseEntity from "../base";

export default class TagEntity extends BaseEntity {
  @Expose()
  id: number | null;
  @Expose()
  name: string;
  @Expose()
  description: string;
}
