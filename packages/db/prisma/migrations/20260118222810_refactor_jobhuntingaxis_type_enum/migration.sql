/*
  Warnings:

  - The `priorityType` column on the `JobHuntingAxis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PriorityType" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "JobHuntingAxis" DROP COLUMN "priorityType",
ADD COLUMN     "priorityType" "PriorityType";
