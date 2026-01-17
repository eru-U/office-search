"use server";
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * ヘッダー情報を取得する関数
 * @param id
 */
export const headerFetch = async (id: string) => {
  try {
    const session = await getRequiredSession();
    const companyData = await prismaClient.company.findUnique({
      where: {
        id: id,
        userId: session.userId,
      },
      select: {
        id: true,
        name: true,
        websiteUrl: true,
        ratingScore: true,
      },
    });
    return companyData;
  } catch (error) {
    console.error("エラーが発生しました", error);
    return null;
  }
};
