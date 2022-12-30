/*
  Warnings:

  - You are about to drop the `contribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contribute_tag_relation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contribute` DROP FOREIGN KEY `contribute_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `contribute_tag_relation` DROP FOREIGN KEY `contribute_tag_relation_contribute_id_fkey`;

-- DropForeignKey
ALTER TABLE `contribute_tag_relation` DROP FOREIGN KEY `contribute_tag_relation_tag_id_fkey`;

-- DropTable
DROP TABLE `contribute`;

-- DropTable
DROP TABLE `contribute_tag_relation`;

-- DropTable
DROP TABLE `tag`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contribute_tag_relations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contributeId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `contribute_tag_relations_contributeId_tagId_key`(`contributeId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contributes` ADD CONSTRAINT `contributes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contribute_tag_relations` ADD CONSTRAINT `contribute_tag_relations_contributeId_fkey` FOREIGN KEY (`contributeId`) REFERENCES `contributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contribute_tag_relations` ADD CONSTRAINT `contribute_tag_relations_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
