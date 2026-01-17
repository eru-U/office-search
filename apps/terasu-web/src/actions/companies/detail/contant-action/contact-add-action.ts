"use server";
import { prismaClient } from "@terasu/db";
import type { CompanyDetailContactTypes } from "@terasu/schema/models/companyDetailContactSchema";

/**
 * 人物情報を追加する関数
 * @param id 年度ID
 * @param data 人物情報データ
 */
export const contactInfoAddAction = async (
  id: string,
  data: CompanyDetailContactTypes,
) => {
  try {
    await prismaClient.contactPerson.create({
      data: {
        yearlyInfoId: id,
        name: data.name,
        position: data.position,
        description: data.description,
      },
    });
  } catch (error) {
    console.error("人物情報を登録できませんでした。", error);
    throw error;
  }
};
