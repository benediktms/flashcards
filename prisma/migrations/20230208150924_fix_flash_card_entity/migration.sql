/*
  Warnings:

  - Added the required column `flashcardCollectionId` to the `Flashcard` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Flashcard` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_userId_fkey";

-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "flashcardCollectionId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_flashcardCollectionId_fkey" FOREIGN KEY ("flashcardCollectionId") REFERENCES "FlashcardCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
