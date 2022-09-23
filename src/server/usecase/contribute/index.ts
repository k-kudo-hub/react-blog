import { PrismaClient } from "@prisma/client";
import { fetchContributes } from "../../repository/contribute";
import { formatContributes } from "../../service/contribute";

export const getAllContributes = async () => {
  const prisma = new PrismaClient();

  try {
    const contributesData = await fetchContributes(prisma);
    return formatContributes(contributesData);
  } catch (error) {
    console.error({ error });
    throw new Error("投稿の取得に失敗しました。");
  } finally {
    prisma.$disconnect();
  }
};
