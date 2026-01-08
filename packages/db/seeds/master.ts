import { prismaClient } from "../lib/client";

export const seedMasters = async (userId: string) => {
  console.log("📊 Seeding Masters...");
  const industries = ["IT", "製造", "金融"];
  const empStatuses = ["正社員", "契約社員", "インターン"];
  const laborCats = ["通常労働", "フレックス", "裁量労働"];
  const salaryCats = ["月給", "年俸", "時給"];
  const techStacks = ["Next.js", "TypeScript", "PostgreSQL"];

  for (const name of industries)
    await prismaClient.industry.upsert({
      where: { id: `ind-${name}` },
      update: {},
      create: { id: `ind-${name}`, name, userId },
    });
  for (const name of empStatuses)
    await prismaClient.employmentStatus.upsert({
      where: { id: `emp-${name}` },
      update: {},
      create: { id: `emp-${name}`, name, userId },
    });
  for (const name of laborCats)
    await prismaClient.laborCategory.upsert({
      where: { id: `lab-${name}` },
      update: {},
      create: { id: `lab-${name}`, name, userId },
    });
  for (const name of salaryCats)
    await prismaClient.salaryCategory.upsert({
      where: { id: `sc-${name}` },
      update: {},
      create: { id: `sc-${name}`, name },
    });
  for (const name of techStacks)
    await prismaClient.techStack.upsert({
      where: { id: `ts-${name}` },
      update: {},
      create: { id: `ts-${name}`, name, userId },
    });
};
