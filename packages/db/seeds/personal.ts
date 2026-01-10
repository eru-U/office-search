import cuid from "@paralleldrive/cuid2";
import { prismaClient } from "../lib/client";

/**
 * 個人・マッチングデータのシード
 */
export const seedPersonalData = async (userId: string) => {
  console.log("👤 個人・マッチングデータのシードを実行中...");

  for (let i = 1; i <= 3; i++) {
    const suffix = `${userId}-${i}`;

    await prismaClient.todo.upsert({
      where: { id: `todo-${suffix}` },
      update: {},
      create: {
        id: cuid.createId(),
        userId,
        title: `TODO ${i}`,
        isCompleted: false,
      },
    });

    await prismaClient.qualification.upsert({
      where: { id: `qual-${suffix}` },
      update: {},
      create: { id: cuid.createId(), userId, name: `資格 ${i}` },
    });

    await prismaClient.careerVision.upsert({
      where: { id: `cv-${suffix}` },
      update: {},
      create: {
        id: cuid.createId(),
        userId,
        name: `ビジョン ${i}`,
        targetYear: new Date(),
      },
    });

    await prismaClient.tag.upsert({
      where: { id: `tag-${suffix}` },
      update: {},
      create: { id: cuid.createId(), userId, name: `タグ ${i}` },
    });

    const axis = await prismaClient.jobHuntingAxis.upsert({
      where: { id: `axis-${suffix}` },
      update: {},
      create: { id: cuid.createId(), userId, content: `就活の軸 ${i}` },
    });

    const comps = await prismaClient.company.findMany({
      where: { userId },
      take: 3,
    });

    for (const c of comps) {
      // CompanyAxisMatching は複合キー @@id([companyId, axisId]) のため、単独 id は不要
      await prismaClient.companyAxisMatching.upsert({
        where: {
          companyId_axisId: {
            companyId: c.id,
            axisId: axis.id,
          },
        },
        update: {
          score: 80,
        },
        create: {
          companyId: c.id,
          axisId: axis.id,
          score: 80,
        },
      });
    }
  }
};
