/*
  Warnings:

  - You are about to drop the column `yearlyInfoId` on the `Branch` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_yearlyInfoId_fkey";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "yearlyInfoId",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
