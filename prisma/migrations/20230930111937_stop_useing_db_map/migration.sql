/*
  Warnings:

  - You are about to drop the `contribute_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contribute_tag_relations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contribute_details` DROP FOREIGN KEY `contribute_details_contribute_id_fkey`;

-- DropForeignKey
ALTER TABLE `contribute_tag_relations` DROP FOREIGN KEY `contribute_tag_relations_contribute_id_fkey`;

-- DropForeignKey
ALTER TABLE `contribute_tag_relations` DROP FOREIGN KEY `contribute_tag_relations_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `contributes` DROP FOREIGN KEY `contributes_user_id_fkey`;

-- DropTable
DROP TABLE `contribute_details`;

-- DropTable
DROP TABLE `contribute_tag_relations`;

-- DropTable
DROP TABLE `contributes`;

-- DropTable
DROP TABLE `tags`;

-- CreateTable
CREATE TABLE `Contribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `identityCode` VARCHAR(191) NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `lastEditedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Contribute_identityCode_key`(`identityCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContributeDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contributeId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ContributeDetail_contributeId_key`(`contributeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContributeTagRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contributeId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ContributeTagRelation_contributeId_tagId_key`(`contributeId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contribute` ADD CONSTRAINT `Contribute_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributeDetail` ADD CONSTRAINT `ContributeDetail_contributeId_fkey` FOREIGN KEY (`contributeId`) REFERENCES `Contribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributeTagRelation` ADD CONSTRAINT `ContributeTagRelation_contributeId_fkey` FOREIGN KEY (`contributeId`) REFERENCES `Contribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributeTagRelation` ADD CONSTRAINT `ContributeTagRelation_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
