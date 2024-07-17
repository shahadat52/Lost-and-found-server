/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `foundItemCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "foundItemCategories_name_key" ON "foundItemCategories"("name");
