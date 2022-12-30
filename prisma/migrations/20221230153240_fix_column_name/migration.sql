/*
  Warnings:

  - You are about to drop the column `lastEditedAt` on the `contributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contributes` DROP COLUMN `lastEditedAt`,
    ADD COLUMN `last_edited_at` DATETIME(3) NULL;
