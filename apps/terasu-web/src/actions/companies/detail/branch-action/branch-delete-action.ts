"use server";

import { prismaClient } from "@terasu/db";

/**
 * 企業に拠点・支店を削除する関数
 * @param branchId 拠点・支店ID
 */
export const branchDeleteAction = async (branchId: string) => {
  try {
    await prismaClient.branch.delete({
      where: {
        id: branchId,
      },
    });
  } catch (error) {
    console.error("拠点・支店削除に失敗しました", error);
    throw error;
  }
};
