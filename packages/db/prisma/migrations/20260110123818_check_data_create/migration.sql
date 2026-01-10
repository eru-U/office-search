/*
  Warnings:

  - You are about to drop the column `name` on the `SalaryCategory` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `SalaryCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "establishedDate" DROP NOT NULL,
ALTER COLUMN "isFavorite" SET DEFAULT false,
ALTER COLUMN "viewCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "SalaryCategory" DROP COLUMN "name",
ADD COLUMN     "categoryName" TEXT NOT NULL;
