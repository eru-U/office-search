"use server";
import { prismaClient } from "@terasu/db";

interface WelfareEditTypes {
  name: string;
  content?: string | null;
}
/**
 * 福利厚生編集用アクション
 * @param data
 * @param id 福利厚生ID
 */
export const welfareEditAction = async (id: string, data: WelfareEditTypes) => {
  try {
    await prismaClient.welfare.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        content: data.content,
      },
    });
  } catch (error) {
    console.error("福利厚生の編集に失敗しました", error);
    throw error;
  }
};
