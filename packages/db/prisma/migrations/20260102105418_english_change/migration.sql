/*
  Warnings:

  - The primary key for the `QA` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `QAID` on the `QA` table. All the data in the column will be lost.
  - You are about to drop the column `回答内容` on the `QA` table. All the data in the column will be lost.
  - You are about to drop the column `質問内容` on the `QA` table. All the data in the column will be lost.
  - You are about to drop the column `選考スケジュールID` on the `QA` table. All the data in the column will be lost.
  - You are about to drop the `TODO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `キャリアビジョン` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `セッション` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `タグマスタ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `タスク` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `メモ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `メール認証用` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ユーザー` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `事業内容` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `企業` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `企業就活軸マッチング` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `企業理念テーブル` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `休日制度` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `保有資格` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `労働区分マスタ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `労働時間` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `募集職種` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `就活軸` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `年代別企業テーブル` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `手当` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `技術スタックマスタ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `拠点・支店` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `業界マスタ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `研修制度` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `福利厚生` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `給与` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `賞与` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `連携用` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `選考スケジュール` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `重要人物・連絡先` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `雇用形態マスタ` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `QA` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `question` to the `QA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `QA` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('ANNUAL', 'MONTHLY', 'DISCRETIONARY');

-- DropForeignKey
ALTER TABLE "QA" DROP CONSTRAINT "QA_選考スケジュールID_fkey";

-- DropForeignKey
ALTER TABLE "TODO" DROP CONSTRAINT "TODO_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToIndustry" DROP CONSTRAINT "_CompanyToIndustry_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToIndustry" DROP CONSTRAINT "_CompanyToIndustry_B_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToTag" DROP CONSTRAINT "_CompanyToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToTag" DROP CONSTRAINT "_CompanyToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_JobToTechStack" DROP CONSTRAINT "_JobToTechStack_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobToTechStack" DROP CONSTRAINT "_JobToTechStack_B_fkey";

-- DropForeignKey
ALTER TABLE "キャリアビジョン" DROP CONSTRAINT "キャリアビジョン_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "セッション" DROP CONSTRAINT "セッション_userId_fkey";

-- DropForeignKey
ALTER TABLE "タグマスタ" DROP CONSTRAINT "タグマスタ_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "タスク" DROP CONSTRAINT "タスク_スケジュールID_fkey";

-- DropForeignKey
ALTER TABLE "メモ" DROP CONSTRAINT "メモ_企業ID_fkey";

-- DropForeignKey
ALTER TABLE "事業内容" DROP CONSTRAINT "事業内容_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "企業" DROP CONSTRAINT "企業_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "企業就活軸マッチング" DROP CONSTRAINT "企業就活軸マッチング_企業ID_fkey";

-- DropForeignKey
ALTER TABLE "企業就活軸マッチング" DROP CONSTRAINT "企業就活軸マッチング_就活軸ID_fkey";

-- DropForeignKey
ALTER TABLE "企業理念テーブル" DROP CONSTRAINT "企業理念テーブル_企業ID_fkey";

-- DropForeignKey
ALTER TABLE "休日制度" DROP CONSTRAINT "休日制度_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "保有資格" DROP CONSTRAINT "保有資格_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "労働区分マスタ" DROP CONSTRAINT "労働区分マスタ_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "労働時間" DROP CONSTRAINT "労働時間_募集職種ID_fkey";

-- DropForeignKey
ALTER TABLE "募集職種" DROP CONSTRAINT "募集職種_労働区分ID_fkey";

-- DropForeignKey
ALTER TABLE "募集職種" DROP CONSTRAINT "募集職種_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "募集職種" DROP CONSTRAINT "募集職種_雇用形態ID_fkey";

-- DropForeignKey
ALTER TABLE "就活軸" DROP CONSTRAINT "就活軸_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "年代別企業テーブル" DROP CONSTRAINT "年代別企業テーブル_企業ID_fkey";

-- DropForeignKey
ALTER TABLE "手当" DROP CONSTRAINT "手当_給与ID_fkey";

-- DropForeignKey
ALTER TABLE "技術スタックマスタ" DROP CONSTRAINT "技術スタックマスタ_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "拠点・支店" DROP CONSTRAINT "拠点・支店_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "業界マスタ" DROP CONSTRAINT "業界マスタ_ユーザーID_fkey";

-- DropForeignKey
ALTER TABLE "研修制度" DROP CONSTRAINT "研修制度_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "福利厚生" DROP CONSTRAINT "福利厚生_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "給与" DROP CONSTRAINT "給与_募集職種ID_fkey";

-- DropForeignKey
ALTER TABLE "賞与" DROP CONSTRAINT "賞与_給与ID_fkey";

-- DropForeignKey
ALTER TABLE "連携用" DROP CONSTRAINT "連携用_userId_fkey";

-- DropForeignKey
ALTER TABLE "選考スケジュール" DROP CONSTRAINT "選考スケジュール_募集職種ID_fkey";

-- DropForeignKey
ALTER TABLE "重要人物・連絡先" DROP CONSTRAINT "重要人物・連絡先_年代ID_fkey";

-- DropForeignKey
ALTER TABLE "雇用形態マスタ" DROP CONSTRAINT "雇用形態マスタ_ユーザーID_fkey";

-- AlterTable
ALTER TABLE "QA" DROP CONSTRAINT "QA_pkey",
DROP COLUMN "QAID",
DROP COLUMN "回答内容",
DROP COLUMN "質問内容",
DROP COLUMN "選考スケジュールID",
ADD COLUMN     "answer" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "scheduleId" TEXT NOT NULL,
ADD CONSTRAINT "QA_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "TODO";

-- DropTable
DROP TABLE "キャリアビジョン";

-- DropTable
DROP TABLE "セッション";

-- DropTable
DROP TABLE "タグマスタ";

-- DropTable
DROP TABLE "タスク";

-- DropTable
DROP TABLE "メモ";

-- DropTable
DROP TABLE "メール認証用";

-- DropTable
DROP TABLE "ユーザー";

-- DropTable
DROP TABLE "事業内容";

-- DropTable
DROP TABLE "企業";

-- DropTable
DROP TABLE "企業就活軸マッチング";

-- DropTable
DROP TABLE "企業理念テーブル";

-- DropTable
DROP TABLE "休日制度";

-- DropTable
DROP TABLE "保有資格";

-- DropTable
DROP TABLE "労働区分マスタ";

-- DropTable
DROP TABLE "労働時間";

-- DropTable
DROP TABLE "募集職種";

-- DropTable
DROP TABLE "就活軸";

-- DropTable
DROP TABLE "年代別企業テーブル";

-- DropTable
DROP TABLE "手当";

-- DropTable
DROP TABLE "技術スタックマスタ";

-- DropTable
DROP TABLE "拠点・支店";

-- DropTable
DROP TABLE "業界マスタ";

-- DropTable
DROP TABLE "研修制度";

-- DropTable
DROP TABLE "福利厚生";

-- DropTable
DROP TABLE "給与";

-- DropTable
DROP TABLE "賞与";

-- DropTable
DROP TABLE "連携用";

-- DropTable
DROP TABLE "選考スケジュール";

-- DropTable
DROP TABLE "重要人物・連絡先";

-- DropTable
DROP TABLE "雇用形態マスタ";

-- DropEnum
DROP TYPE "SeidoKibun";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "establishedDate" TIMESTAMP(3) NOT NULL,
    "capital" BIGINT,
    "websiteUrl" TEXT,
    "phoneNumber" TEXT,
    "ratingScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aspirationLevel" INTEGER,
    "isFavorite" BOOLEAN NOT NULL,
    "viewCount" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyYearlyInfo" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "recruitmentUrl" TEXT,
    "dataDate" TIMESTAMP(3) NOT NULL,
    "employeeCount" INTEGER,
    "representative" TEXT NOT NULL,
    "revenue" BIGINT,
    "isSideJobAllowed" BOOLEAN,
    "hasShortTimeWork" BOOLEAN,
    "isDressFree" BOOLEAN,

    CONSTRAINT "CompanyYearlyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT,
    "address" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "probationMonths" DOUBLE PRECISION,
    "employmentStatusId" TEXT,
    "laborCategoryId" TEXT NOT NULL,
    "isRemoteAllowed" BOOLEAN NOT NULL,
    "notes" TEXT,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" TEXT NOT NULL,
    "jobPostingId" TEXT NOT NULL,
    "type" "SalaryType" NOT NULL,
    "amount" INTEGER,
    "baseSalary" INTEGER,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memo" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Memo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ContactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectionSchedule" (
    "id" TEXT NOT NULL,
    "parentId" TEXT,
    "jobPostingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "notes" TEXT,
    "isCompleted" BOOLEAN NOT NULL,
    "passed" BOOLEAN,
    "statusUpdatedAt" TIMESTAMP(3),
    "locationUrl" TEXT,

    CONSTRAINT "SelectionSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "notes" TEXT,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobHuntingAxis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT,
    "priorityType" INTEGER,
    "displayOrder" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobHuntingAxis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAxisMatching" (
    "companyId" TEXT NOT NULL,
    "axisId" TEXT NOT NULL,
    "score" INTEGER,

    CONSTRAINT "CompanyAxisMatching_pkey" PRIMARY KEY ("companyId","axisId")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isCompleted" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "obtainedDate" TIMESTAMP(3),

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStack" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPhilosophy" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "CompanyPhilosophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessContent" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "BusinessContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allowance" (
    "id" TEXT NOT NULL,
    "salaryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Allowance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bonus" (
    "id" TEXT NOT NULL,
    "salaryId" TEXT NOT NULL,
    "timesPerYear" INTEGER,
    "months" DOUBLE PRECISION,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" TEXT NOT NULL,
    "jobPostingId" TEXT NOT NULL,
    "startTime" TIME,
    "endTime" TIME,
    "coreStartTime" TIME,
    "coreEndTime" TIME,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaborCategory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LaborCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HolidaySystem" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HolidaySystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Welfare" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Welfare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSystem" (
    "id" TEXT NOT NULL,
    "yearlyInfoId" TEXT NOT NULL,
    "months" DOUBLE PRECISION NOT NULL,
    "content" TEXT,

    CONSTRAINT "TrainingSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "EmploymentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerVision" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "targetYear" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerVision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identified" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identified")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Industry" ADD CONSTRAINT "Industry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyYearlyInfo" ADD CONSTRAINT "CompanyYearlyInfo_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_employmentStatusId_fkey" FOREIGN KEY ("employmentStatusId") REFERENCES "EmploymentStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_laborCategoryId_fkey" FOREIGN KEY ("laborCategoryId") REFERENCES "LaborCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactPerson" ADD CONSTRAINT "ContactPerson_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionSchedule" ADD CONSTRAINT "SelectionSchedule_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobHuntingAxis" ADD CONSTRAINT "JobHuntingAxis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAxisMatching" ADD CONSTRAINT "CompanyAxisMatching_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAxisMatching" ADD CONSTRAINT "CompanyAxisMatching_axisId_fkey" FOREIGN KEY ("axisId") REFERENCES "JobHuntingAxis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "SelectionSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QA" ADD CONSTRAINT "QA_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "SelectionSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechStack" ADD CONSTRAINT "TechStack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPhilosophy" ADD CONSTRAINT "CompanyPhilosophy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessContent" ADD CONSTRAINT "BusinessContent_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allowance" ADD CONSTRAINT "Allowance_salaryId_fkey" FOREIGN KEY ("salaryId") REFERENCES "Salary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_salaryId_fkey" FOREIGN KEY ("salaryId") REFERENCES "Salary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaborCategory" ADD CONSTRAINT "LaborCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HolidaySystem" ADD CONSTRAINT "HolidaySystem_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Welfare" ADD CONSTRAINT "Welfare_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSystem" ADD CONSTRAINT "TrainingSystem_yearlyInfoId_fkey" FOREIGN KEY ("yearlyInfoId") REFERENCES "CompanyYearlyInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentStatus" ADD CONSTRAINT "EmploymentStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerVision" ADD CONSTRAINT "CareerVision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTag" ADD CONSTRAINT "_CompanyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTag" ADD CONSTRAINT "_CompanyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToIndustry" ADD CONSTRAINT "_CompanyToIndustry_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToIndustry" ADD CONSTRAINT "_CompanyToIndustry_B_fkey" FOREIGN KEY ("B") REFERENCES "Industry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToTechStack" ADD CONSTRAINT "_JobToTechStack_A_fkey" FOREIGN KEY ("A") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToTechStack" ADD CONSTRAINT "_JobToTechStack_B_fkey" FOREIGN KEY ("B") REFERENCES "TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
