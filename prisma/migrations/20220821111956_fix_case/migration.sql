/*
  Warnings:

  - You are about to drop the column `contributeId` on the `contribute_tag_relations` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `contribute_tag_relations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `contributes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contribute_id,tag_id]` on the table `contribute_tag_relations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contribute_id` to the `contribute_tag_relations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `contribute_tag_relations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `contributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contribute_tag_relations` DROP FOREIGN KEY `contribute_tag_relations_contributeId_fkey`;

-- DropForeignKey
ALTER TABLE `contribute_tag_relations` DROP FOREIGN KEY `contribute_tag_relations_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `contributes` DROP FOREIGN KEY `contributes_userId_fkey`;

-- DropIndex
DROP INDEX `contribute_tag_relations_contributeId_tagId_key` ON `contribute_tag_relations`;

-- AlterTable
ALTER TABLE `contribute_tag_relations` DROP COLUMN `contributeId`,
    DROP COLUMN `tagId`,
    ADD COLUMN `contribute_id` INTEGER NOT NULL,
    ADD COLUMN `tag_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `contributes` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `contribute_tag_relations_contribute_id_tag_id_key` ON `contribute_tag_relations`(`contribute_id`, `tag_id`);

-- AddForeignKey
ALTER TABLE `contributes` ADD CONSTRAINT `contributes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contribute_tag_relations` ADD CONSTRAINT `contribute_tag_relations_contribute_id_fkey` FOREIGN KEY (`contribute_id`) REFERENCES `contributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contribute_tag_relations` ADD CONSTRAINT `contribute_tag_relations_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
