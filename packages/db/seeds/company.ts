import { prismaClient } from "../lib/client";

export const seedCompanies = async (userId: string) => {
  console.log("🏢 Seeding Companies and deep hierarchies...");
  const lab = await prismaClient.laborCategory.findFirst();
  const sc = await prismaClient.salaryCategory.findFirst();
  const emp = await prismaClient.employmentStatus.findFirst();

  for (let i = 1; i <= 3; i++) {
    const cId = `comp-${i}`;
    await prismaClient.company.upsert({
      where: { id: cId },
      update: {},
      create: {
        id: cId,
        userId,
        name: `テスト企業 ${i}`,
        establishedDate: new Date(),
        isFavorite: i === 1,
        viewCount: 0,
        philosophies: { create: { content: `理念 ${i}` } },
        memos: { create: { content: `メモ ${i}` } },
        yearlyInfos: {
          create: {
            id: `y-${i}`,
            representative: `代表 ${i}`,
            dataDate: new Date(),
            branches: { create: { address: `住所 ${i}` } },
            businessContents: { create: { title: `事業 ${i}` } },
            holidaySystems: { create: { name: `休日 ${i}` } },
            welfares: { create: { name: `福利厚生 ${i}` } },
            trainingSystems: { create: { months: 3, content: `研修 ${i}` } },
            contactPersons: { create: { name: `担当 ${i}`, position: "人事" } },
            jobPostings: {
              create: {
                id: `job-${i}`,
                title: `職種 ${i}`,
                isRemoteAllowed: true,
                laborCategoryId: lab!.id,
                employmentStatusId: emp!.id,
                workingHours: {
                  create: { startTime: new Date(), endTime: new Date() },
                },
                salaries: {
                  create: {
                    salaryCategoryId: sc!.id,
                    amount: 300000,
                    allowances: { create: { name: "手当", amount: 10000 } },
                    bonuses: { create: { timesPerYear: 2, months: 4 } },
                  },
                },
                selectionSchedules: {
                  create: {
                    id: `sel-${i}`,
                    title: `選考 ${i}`,
                    isCompleted: false,
                    tasks: {
                      create: {
                        title: `課題 ${i}`,
                        priority: 1,
                        isCompleted: false,
                      },
                    },
                    qas: { create: { question: `Q ${i}`, answer: `A ${i}` } },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
};
