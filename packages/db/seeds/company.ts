import { prismaClient } from "../lib/client";

export const seedCompanies = async (userId: string) => {
  console.log("🏢 企業データの詳細シードを実行中...");

  const lab = await prismaClient.laborCategory.findFirst();
  const sc = await prismaClient.salaryCategory.findFirst();
  const emp = await prismaClient.employmentStatus.findFirst();

  if (!lab || !sc || !emp) {
    console.error(
      "❌ カテゴリデータが見つかりません。masterシードを先に実行してください。",
    );
    return;
  }

  const testCompanies = [
    { id: "comp-1", name: "株式会社テラス・イノベーション", fav: true },
    { id: "comp-2", name: "フューチャー・フロント・ラボ", fav: false },
    { id: "comp-3", name: "ネクスト・ステップ・ワークス", fav: false },
  ];

  for (const c of testCompanies) {
    await prismaClient.company.upsert({
      where: { id: c.id },
      update: { name: c.name, isFavorite: c.fav },
      create: {
        id: c.id,
        userId,
        name: c.name,
        establishedDate: new Date(),
        isFavorite: c.fav,
        viewCount: 0,
        philosophies: { create: { content: `${c.name}の理念です。` } },
        memos: { create: { content: `${c.name}のメモです。` } },
        yearlyInfos: {
          create: {
            id: `y-${c.id}`,
            representative: "代表 太郎",
            dataDate: new Date(),
            branches: { create: { address: "東京都渋谷区" } },
            businessContents: { create: { title: "受託開発" } },
            holidaySystems: { create: { name: "土日祝休み" } },
            welfares: { create: { name: "福利厚生充実" } },
            trainingSystems: { create: { months: 3, content: "OJT研修" } },
            contactPersons: { create: { name: "採用担当", position: "人事" } },
            jobPostings: {
              create: {
                id: `job-${c.id}`,
                title: "エンジニア",
                isRemoteAllowed: true,
                laborCategoryId: lab.id,
                employmentStatusId: emp.id,
                workingHours: {
                  create: { startTime: new Date(), endTime: new Date() },
                },
                salaries: {
                  create: {
                    salaryCategoryId: sc.id,
                    amount: 320000,
                    allowances: { create: { name: "手当", amount: 5000 } },
                    bonuses: { create: { timesPerYear: 2, months: 4 } },
                  },
                },
                selectionSchedules: {
                  create: {
                    id: `sel-${c.id}`,
                    title: "選考フロー",
                    isCompleted: false,
                    tasks: {
                      create: {
                        title: "面談",
                        priority: 1,
                        isCompleted: false,
                      },
                    },
                    qas: { create: { question: "Q", answer: "A" } },
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
