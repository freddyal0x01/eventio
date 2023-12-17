/*
  Warnings:

  - You are about to drop the column `onboaded` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "onboaded",
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT true;
