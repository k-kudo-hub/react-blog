import { PrismaClient } from "@prisma/client";

interface Contribute {
  id: number;
  title: string;
  tags: string[];
}

export const getAllContributes = async () => {
  const prisma = new PrismaClient();

  const contributes = await prisma.contribute.findMany({
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });

  return contributes;
};
