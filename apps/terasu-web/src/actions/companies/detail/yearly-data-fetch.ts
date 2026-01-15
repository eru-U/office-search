"use server";
import { prismaClient } from "@terasu/db";

/**
 * 年代の一覧を取得する関数
 * @param id 企業ID
 */
export const yearlyDataFetch = async (id: string) => {
  try {
    const result = await prismaClient.companyYearlyInfo.findMany({
      where: {
        companyId: id,
      },
      select: {
        id: true,
        dataDate: true,
      },
      orderBy: {
        dataDate: "asc",
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching yearly info:", error);
    throw error;
  }
};
