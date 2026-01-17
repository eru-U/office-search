"use server";
import { prismaClient } from "@terasu/db";

/**
 * 企業理念IDを受け取ってデータを削除する関数
 * @param id 企業理念ID
 */
export const philosophyInfoDeleteAction = async (id: string) => {
  await prismaClient.companyPhilosophy.delete({
    where: {
      id: id,
    },
  });
};
