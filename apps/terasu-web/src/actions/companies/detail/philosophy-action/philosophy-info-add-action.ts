"use server";
import { prismaClient } from "@terasu/db";
import type { CompanyDetailPhilosophyAddTypes } from "@terasu/schema/models/companyDetailPhilosophySchema";

/**
 * 企業理念を登録するアクション
 * @param id 企業ID
 * @param data 企業理念が入ったデータ
 */
export const philosophyInfoAddAction = async (
  id: string,
  data: CompanyDetailPhilosophyAddTypes,
) => {
  try {
    await prismaClient.companyPhilosophy.create({
      data: {
        companyId: id,
        content: data.content,
      },
    });
  } catch (error) {
    console.error("企業理念を登録できませんでした。", error);
    throw error;
  }
};
