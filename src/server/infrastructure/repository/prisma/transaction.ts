import { PrismaClient } from "@prisma/client";
import prisma from ".";
import CustomError from "@server/domain/entity/error";
import { StatusCodes } from "@constants/http";

export default class TransactionManager {
  db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async execute(callback: (tx: any) => Promise<any>): Promise<any> {
    return await this.transaction(callback).catch(async (e) => {
      console.error(e);
      throw new CustomError({
        statusCode: e.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        code: e.code || StatusCodes.INTERNAL_SERVER_ERROR,
        message: e.message || "DB処理でエラーが発生しました。",
      });
    });
  }

  private async transaction(callback: (tx: any) => Promise<unknown>) {
    return await this.db.$transaction(
      async (tx) => {
        return new Promise((resolve) => resolve(callback(tx)));
      },
      { maxWait: 5000, timeout: 10000 },
    );
  }
}
