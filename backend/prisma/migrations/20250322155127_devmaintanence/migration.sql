-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorname" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "published" SET DEFAULT now();
