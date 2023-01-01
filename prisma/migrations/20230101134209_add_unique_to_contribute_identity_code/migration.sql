/*
  Warnings:

  - A unique constraint covering the columns `[identity_code]` on the table `contributes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `contributes_identity_code_key` ON `contributes`(`identity_code`);
