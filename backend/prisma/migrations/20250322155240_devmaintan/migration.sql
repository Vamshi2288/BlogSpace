/*
  Warnings:

  - You are about to drop the column `authorname` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorname",
ALTER COLUMN "published" SET DEFAULT now();
