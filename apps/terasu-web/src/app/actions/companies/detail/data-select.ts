"use server";

import { prismaClient } from "@terasu/db";

export default async function getCompanyDetail(id: string) {
  try {
    if (!id) {
      return null;
    }

    // ヘッダー用のデータを取得
    const company = prismaClient.company.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        websiteUrl: true,
        ratingScore: true,
      },
    });

    return company;
  } catch (error) {
    console.error("企業情報取得エラー", error);
    return null;
  }
}
