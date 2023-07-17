import { PrismaClient } from "@prisma/client";
import prisma from ".";

export default class TransactionManager {
  db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async execute(callback: (tx: any) => Promise<any>): Promise<any> {
    return this.transaction(callback).finally(async () => {
      await this.db.$disconnect();
    });
  }

  private async transaction(callback: (tx: any) => Promise<unknown>) {
    return await this.db.$transaction(async (tx) => {
      return new Promise((resolve) => resolve(callback(tx)));
    });
  }
}
