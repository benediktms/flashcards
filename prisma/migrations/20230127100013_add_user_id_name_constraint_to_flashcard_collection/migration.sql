/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `FlashcardCollection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FlashcardCollection_name_userId_key" ON "FlashcardCollection"("name", "userId");
