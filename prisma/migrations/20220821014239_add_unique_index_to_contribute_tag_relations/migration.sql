/*
  Warnings:

  - A unique constraint covering the columns `[contribute_id,tag_id]` on the table `contribute_tag_relations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `contribute_tag_relations_contribute_id_tag_id_key` ON `contribute_tag_relations`(`contribute_id`, `tag_id`);
