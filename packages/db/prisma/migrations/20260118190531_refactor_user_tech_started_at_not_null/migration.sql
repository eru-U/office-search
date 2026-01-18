/*
  Warnings:

  - Made the column `startedAt` on table `UserTech` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserTech" ALTER COLUMN "startedAt" SET NOT NULL;
