"use server";
import { prismaClient } from "@terasu/db";

/**
 * 人物情報を削除する関数
 * @param id 人物情報ID
 */
export const contactInfoDeleteAction = async (id: string) => {
  try {
    await prismaClient.contactPerson.delete({
      where: { id },
    });
  } catch (error) {
    console.error("人物情報を削除できませんでした。", error);
    throw error;
  }
};
