"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { type Prisma, prismaClient } from "@terasu/db";
import { companySchema } from "@terasu/schema";
/**
 * 企業検索アクション
 */
export async function searchCompaniesAction(
  params: companySchema.SearchCompanySchema & { page?: number },
) {
  const { userId } = await getRequiredSession();

  // ページネーション用
  const pageSize = 20; // 最大20件
  const page = params.page || 1; // 現在のページ
  const skip = (page - 1) * pageSize; // 読み始めるページ

  // 検索条件の構築
  const where: Prisma.CompanyWhereInput = { userId };

  // 企業名
  if (params.name) {
    where.name = { contains: params.name, mode: "insensitive" };
  }

  // 業界
  if (params.industryName) {
    where.industries = {
      // 指定した業界に１つでも条件に一致するデータが関連テーブルにあればその企業を表示する
      some: {
        id: params.industryName,
      },
    };
  }

  // 想定年収
  if (params.yearSalary && params.yearSalary > 0) {
    where.yearlyInfos = {
      some: {
        jobPostings: {
          some: {
            salaries: {
              some: {
                amount: {
                  // gteは>=のこと（以上）
                  gte: params.yearSalary,
                },
              },
            },
          },
        },
      },
    };
  }

  try {
    // 2つとも処理が終わるまで待つ。実行は同時
    const [companies, totalCount] = await Promise.all([
      prismaClient.company.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { updatedAt: "desc" },
      }),
      prismaClient.company.count({ where }),
    ]);

    const validatedData = companySchema.companyListArraySchema.parse(companies);

    return {
      success: true,
      data: validatedData,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.error("企業の検索に失敗しました", error);
    return {
      success: false,
      data: [],
      totalCount: 0,
      totalPages: 0,
    };
  }
}
