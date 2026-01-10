import { prismaClient } from "../lib/client";

export const seedPersonalData = async (userId: string) => {
  console.log("👤 個人・マッチングデータのシードを実行中...");

  for (let i = 1; i <= 3; i++) {
    const suffix = `${userId}-${i}`;

    await prismaClient.todo.upsert({
      where: { id: `todo-${suffix}` },
      update: {},
      create: {
        id: `todo-${suffix}`,
        userId,
        title: `TODO ${i}`,
        isCompleted: false,
      },
    });

    await prismaClient.qualification.upsert({
      where: { id: `qual-${suffix}` },
      update: {},
      create: { id: `qual-${suffix}`, userId, name: `資格 ${i}` },
    });

    await prismaClient.careerVision.upsert({
      where: { id: `cv-${suffix}` },
      update: {},
      create: {
        id: `cv-${suffix}`,
        userId,
        name: `ビジョン ${i}`,
        targetYear: new Date(),
      },
    });

    await prismaClient.tag.upsert({
      where: { id: `tag-${suffix}` },
      update: {},
      create: { id: `tag-${suffix}`, userId, name: `タグ ${i}` },
    });

    const axis = await prismaClient.jobHuntingAxis.upsert({
      where: { id: `axis-${suffix}` },
      update: {},
      create: { id: `axis-${suffix}`, userId, content: `就活の軸 ${i}` },
    });

    const comps = await prismaClient.company.findMany({ take: 3 });
    for (const c of comps) {
      await prismaClient.companyAxisMatching.upsert({
        where: { companyId_axisId: { companyId: c.id, axisId: axis.id } },
        update: {},
        create: { companyId: c.id, axisId: axis.id, score: 80 },
      });
    }
  }
};
