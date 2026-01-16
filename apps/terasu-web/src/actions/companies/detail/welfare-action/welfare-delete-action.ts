"use server";
import { prismaClient } from "@terasu/db";

export const welfareDeleteAction = async (id: string) => {
  try {
    await prismaClient.welfare.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("福利厚生の削除に失敗しました", error);
    throw error;
  }
};
