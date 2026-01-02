/*
  Warnings:

  - You are about to drop the column `type` on the `Salary` table. All the data in the column will be lost.
  - Added the required column `salaryCategoryId` to the `Salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmploymentStatus" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Industry" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "LaborCategory" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "type",
ADD COLUMN     "salaryCategoryId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SalaryType";

-- CreateTable
CREATE TABLE "SalaryCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SalaryCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_salaryCategoryId_fkey" FOREIGN KEY ("salaryCategoryId") REFERENCES "SalaryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
