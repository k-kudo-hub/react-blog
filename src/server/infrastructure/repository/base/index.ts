import { PrismaClient } from "@prisma/client";
import prisma from "../prisma";

export default class RepositoryBase {
  private _db: PrismaClient;

  constructor(db?: PrismaClient) {
    this._db = db || prisma;
  }

  get db() {
    return this._db;
  }
}
