"use server";
import { prismaClient } from "@terasu/db";

interface WelfareAddTypes {
  name: string;
  content?: string | null;
}
/**
 *
 * @param data
 * @param yearlyInfoId 年代ID
 */
export const welfareAddAction = async (
  yearlyInfoId: string,
  data: WelfareAddTypes,
) => {
  try {
    await prismaClient.welfare.create({
      data: {
        yearlyInfoId: yearlyInfoId,
        name: data.name,
        content: data.content,
      },
    });
  } catch (error) {
    console.error("福利厚生の追加に失敗しました", error);
    throw error;
  }
};
