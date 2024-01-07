/*
  Warnings:

  - You are about to drop the column `created_at` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
