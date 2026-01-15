"use server";
import { prismaClient } from "@terasu/db";

/**
 * 年代テーブルにデータを登録する関数
 * @param companyId 企業のID
 * @param dataDate データ群の対象とする日付
 */
export const yearlyDataCreate = async (companyId: string, dataDate: Date) => {
  try {
    await prismaClient.companyYearlyInfo.create({
      data: {
        companyId: companyId,
        dataDate: dataDate,
      },
    });
  } catch (error) {
    console.error("Error creating yearly data:", error);
    throw error;
  }
};
