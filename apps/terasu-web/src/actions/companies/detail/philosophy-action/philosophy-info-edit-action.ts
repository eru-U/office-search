"use server";
import { prismaClient } from "@terasu/db";
import type { companyDetailPhilosophyAddTypes } from "@terasu/schema/models/companyDetailPhilosophySchema";

/**
 * 企業理念を編集するアクション
 * @param id 企業理念ID
 * @param data 企業理念が入ったデータ
 */
export const philosophyInfoEditAction = async (
  id: string,
  data: companyDetailPhilosophyAddTypes,
) => {
  try {
    await prismaClient.companyPhilosophy.update({
      where: {
        id: id,
      },
      data: {
        content: data.content,
      },
    });
  } catch (error) {
    console.error("企業理念を編集できませんでした。", error);
    throw error;
  }
};
