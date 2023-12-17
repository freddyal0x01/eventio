-- AlterTable
ALTER TABLE "User" ADD COLUMN     "settingsEmailMarketing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "settingsEmailProduct" BOOLEAN NOT NULL DEFAULT true;
