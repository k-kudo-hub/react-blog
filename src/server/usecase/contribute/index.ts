import { PrismaClient } from "@prisma/client";
import ContributeRepository from "../../infrastructure/repository/contributes";

export const getAllContributes = async () => {
  const prisma = new PrismaClient();
  const contributeRepository = new ContributeRepository();

  return await contributeRepository.findAll(prisma);
};
