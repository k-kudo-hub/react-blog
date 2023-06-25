/*
  Warnings:

  - You are about to drop the column `title` on the `contributes` table. All the data in the column will be lost.
  - Added the required column `title` to the `contribute_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contribute_details` ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `contributes` DROP COLUMN `title`;
