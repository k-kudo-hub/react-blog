import { PrismaClient } from "@prisma/client";

export const fetchContributes = async (prisma: PrismaClient) => {
  const contributes = await prisma.contribute.findMany({
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });

  return contributes;
};
