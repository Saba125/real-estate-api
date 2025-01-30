/*
  Warnings:

  - Added the required column `category` to the `quizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `quizes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('medium', 'hard', 'easy');

-- AlterTable
ALTER TABLE "quizes" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;
