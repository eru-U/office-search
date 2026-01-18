/*
  Warnings:

  - You are about to drop the column `years` on the `UserTech` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTech" DROP COLUMN "years",
ADD COLUMN     "startedAt" TIMESTAMP(3);
