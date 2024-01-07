import { PrismaClient } from "@prisma/client";
import UserEntity from "@server/domain/entity/user";
import { UserFactory } from "@server/domain/factory/user";

abstract class IUserRepository {
  abstract getById: (id: string) => Promise<UserEntity | null>;
}

const factory = new UserFactory();

export default class UserRepository implements IUserRepository {
  constructor(private db: PrismaClient) {}

  public getById = async (id: string): Promise<UserEntity | null> => {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return factory.construct(user);
  };
}
