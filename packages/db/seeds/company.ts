import cuid from "@paralleldrive/cuid2";
import { prismaClient } from "../lib/client";

/**
 * 企業データの詳細シード
 */
export const seedCompanies = async (userId: string) => {
  console.log("🏢 企業データの詳細シードを実行中...");

  const lab = await prismaClient.laborCategory.findFirst({ where: { userId } });
  const sc = await prismaClient.salaryCategory.findFirst();
  const emp = await prismaClient.employmentStatus.findFirst({
    where: { userId },
  });

  if (!lab || !sc || !emp) {
    console.error("❌ マスタデータが不足しています。");
    return;
  }

  const testCompanies = [
    { name: "株式会社テラス・イノベーション", fav: true },
    { name: "フューチャー・フロント・ラボ", fav: false },
    { name: "ネクスト・ステップ・ワークス", fav: false },
  ];

  for (const c of testCompanies) {
    const existing = await prismaClient.company.findFirst({
      where: { name: c.name, userId },
    });
    const companyId = existing?.id || cuid.createId();

    await prismaClient.company.upsert({
      where: { id: companyId },
      update: { name: c.name, isFavorite: c.fav },
      create: {
        id: companyId,
        userId,
        name: c.name,
        establishedDate: new Date(),
        isFavorite: c.fav,
        viewCount: 0,
        philosophies: {
          create: { id: cuid.createId(), content: `${c.name}の理念です。` },
        },
        memos: {
          create: { id: cuid.createId(), content: `${c.name}のメモです。` },
        },
        yearlyInfos: {
          create: {
            id: cuid.createId(),
            representative: "代表 太郎",
            dataDate: new Date(),
            branches: {
              create: { id: cuid.createId(), address: "東京都渋谷区" },
            },
            businessContents: {
              create: { id: cuid.createId(), title: "受託開発" },
            },
            holidaySystems: {
              create: { id: cuid.createId(), name: "土日祝休み" },
            },
            welfares: {
              create: { id: cuid.createId(), name: "福利厚生充実" },
            },
            trainingSystems: {
              create: { id: cuid.createId(), months: 3, content: "OJT研修" },
            },
            jobPostings: {
              create: {
                id: cuid.createId(),
                title: "エンジニア",
                isRemoteAllowed: true,
                laborCategoryId: lab.id,
                employmentStatusId: emp.id,
                workingHours: {
                  create: {
                    id: cuid.createId(),
                    startTime: new Date(),
                    endTime: new Date(),
                  },
                },
                salaries: {
                  create: {
                    id: cuid.createId(),
                    salaryCategoryId: sc.id,
                    amount: 320000,
                    allowances: {
                      create: {
                        id: cuid.createId(),
                        name: "手当",
                        amount: 5000,
                      },
                    },
                    bonuses: {
                      create: {
                        id: cuid.createId(),
                        timesPerYear: 2,
                        months: 4,
                      },
                    },
                  },
                },
                selectionSchedules: {
                  create: {
                    id: cuid.createId(),
                    title: "選考フロー",
                    isCompleted: false,
                    tasks: {
                      create: {
                        id: cuid.createId(),
                        title: "面談",
                        priority: 1,
                        isCompleted: false,
                      },
                    },
                    qas: {
                      create: {
                        id: cuid.createId(),
                        question: "Q",
                        answer: "A",
                      },
                    },
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
