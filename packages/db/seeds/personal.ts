import { prismaClient } from "../lib/client";

export const seedPersonalData = async (userId: string) => {
  console.log("👤 Seeding Personal/Matching Data...");
  for (let i = 1; i <= 3; i++) {
    await prismaClient.todo.create({
      data: { userId, title: `TODO ${i}`, isCompleted: false },
    });
    await prismaClient.qualification.create({
      data: { userId, name: `資格 ${i}` },
    });
    await prismaClient.careerVision.create({
      data: { userId, name: `ビジョン ${i}`, targetYear: new Date() },
    });
    await prismaClient.tag.create({
      data: { userId, name: `タグ ${i}` },
    });
    const axis = await prismaClient.jobHuntingAxis.create({
      data: { userId, content: `軸 ${i}` },
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
