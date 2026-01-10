import cuid from "cuid";
import { prismaClient } from "../lib/client";

/**
 * 各種カテゴリのマスタデータをシードします。
 */
export const seedMasters = async (userId: string) => {
  console.log("📊 マスターデータのシードを開始します...");

  const industries = ["IT", "製造", "金融"];
  const empStatuses = ["正社員", "契約社員", "インターン"];
  const laborCats = ["通常労働", "フレックス", "裁量労働"];
  const salaryCats = ["月給", "年俸", "時給"];
  const techStacks = ["Next.js", "TypeScript", "PostgreSQL"];

  // 業界マスタ
  for (const name of industries) {
    const existing = await prismaClient.industry.findFirst({
      where: { name, userId },
    });
    const id = existing?.id || cuid();
    await prismaClient.industry.upsert({
      where: { id },
      update: {},
      create: { id, name, userId },
    });
  }

  // 雇用形態マスタ
  for (const name of empStatuses) {
    const existing = await prismaClient.employmentStatus.findFirst({
      where: { name, userId },
    });
    const id = existing?.id || cuid();
    await prismaClient.employmentStatus.upsert({
      where: { id },
      update: {},
      create: { id, name, userId },
    });
  }

  // 労働区分マスタ
  for (const name of laborCats) {
    const existing = await prismaClient.laborCategory.findFirst({
      where: { name, userId },
    });
    const id = existing?.id || cuid();
    await prismaClient.laborCategory.upsert({
      where: { id },
      update: {},
      create: { id, name, userId },
    });
  }

  // 給与形態マスタ
  for (const name of salaryCats) {
    const existing = await prismaClient.salaryCategory.findFirst({
      where: { categoryName: name },
    });
    const id = existing?.id || cuid();
    await prismaClient.salaryCategory.upsert({
      where: { id },
      update: {},
      create: {
        id,
        categoryName: name,
        sortOrder: 0,
      },
    });
  }

  // 技術スタックマスタ
  for (const name of techStacks) {
    const existing = await prismaClient.techStack.findFirst({
      where: { name, userId },
    });
    const id = existing?.id || cuid();
    await prismaClient.techStack.upsert({
      where: { id },
      update: {},
      create: { id, name, userId },
    });
  }

  console.log("✅ マスターデータのシードが正常に完了しました。");
};
