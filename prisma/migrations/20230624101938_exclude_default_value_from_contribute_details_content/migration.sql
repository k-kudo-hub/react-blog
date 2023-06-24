/*
  Warnings:

  - Made the column `content` on table `contribute_details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `contribute_details` MODIFY `content` TEXT NOT NULL;
