import { PrismaClient } from "@prisma/client";
import { ContributeType } from "../../entity/contribute";

export abstract class IContributeRepository {
  abstract findAll: (prisma: PrismaClient) => Promise<ContributeType[]>;
}
