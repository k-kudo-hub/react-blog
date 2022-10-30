import { PrismaClient } from "@prisma/client";
import ContributeEntity from "@server/domain/entity/contribute";

export abstract class IContributeRepository {
  abstract findAll: (prisma: PrismaClient) => Promise<ContributeEntity[]>;
}
