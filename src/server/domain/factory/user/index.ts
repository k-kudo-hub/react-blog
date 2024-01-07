import UserEntity from "@server/domain/entity/user";
import { BaseFactory } from "../base";

interface IUserConstructParams {
  id: string;
  name: string | null;
  image: string | null;
}

export class UserFactory extends BaseFactory {
  construct(params: IUserConstructParams): UserEntity {
    return this.createEntity(UserEntity, params);
  }
}
