"use server";
import { prismaClient } from "@terasu/db";
import type { CompanyDetailContactTypes } from "@terasu/schema/models/companyDetailContactSchema";

/**
 * 人物情報を編集する関数
 * @param id 人物情報ID
 * @param data 人物情報データ
 */
export const contactInfoEditAction = async (
  id: string,
  data: CompanyDetailContactTypes,
) => {
  try {
    await prismaClient.contactPerson.update({
      where: { id },
      data: {
        name: data.name,
        position: data.position,
        description: data.description,
      },
    });
  } catch (error) {
    console.error("人物情報を更新できませんでした。", error);
    throw error;
  }
};
