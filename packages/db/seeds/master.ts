import { prismaClient } from "../lib/client";

/**
 * 各種カテゴリのマスタデータをシードします。
 * schema.prisma の定義に基づき、正しいプロパティ名で upsert を実行します。
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
    await prismaClient.industry.upsert({
      where: { id: `ind-${name}` },
      update: {},
      create: { id: `ind-${name}`, name, userId },
    });
  }

  // 雇用形態マスタ
  for (const name of empStatuses) {
    await prismaClient.employmentStatus.upsert({
      where: { id: `emp-${name}` },
      update: {},
      create: { id: `emp-${name}`, name, userId },
    });
  }

  // 労働区分マスタ
  for (const name of laborCats) {
    await prismaClient.laborCategory.upsert({
      where: { id: `lab-${name}` },
      update: {},
      create: { id: `lab-${name}`, name, userId },
    });
  }

  // 給与形態マスタ (ここを修正: name → categoryName)
  for (const name of salaryCats) {
    await prismaClient.salaryCategory.upsert({
      where: { id: `sc-${name}` },
      update: {},
      create: {
        id: `sc-${name}`,
        categoryName: name, // schema.prisma の定義に合わせました
        sortOrder: 0,
      },
    });
  }

  // 技術スタックマスタ
  for (const name of techStacks) {
    await prismaClient.techStack.upsert({
      where: { id: `ts-${name}` },
      update: {},
      create: { id: `ts-${name}`, name, userId },
    });
  }

  console.log("✅ マスターデータのシードが正常に完了しました。");
};
