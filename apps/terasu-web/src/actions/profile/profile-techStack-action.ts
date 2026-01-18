"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * ユーザーと技術スタックを紐づけます（UserTechの新規登録）。
 * * @param data - 登録する技術の情報（技術ID、開始時期、メモ）
 */
export const profileTechStackAddAction = async (data: {
  techStackId: string;
  startedAt: Date;
  note: string | null;
}) => {
  try {
    const { userId } = await getRequiredSession();

    return await prismaClient.userTech.create({
      data: {
        userId: userId,
        techStackId: data.techStackId,
        startedAt: data.startedAt,
        note: data.note,
      },
    });
  } catch (_error) {
    throw new Error("技術スタックの登録ができませんでした。");
  }
};

/**
 * ユーザーの技術スタック紐づけ情報を更新します。
 * * @param id - UserTechの固有ID
 * @param data - 更新内容（開始時期、メモ）
 */
export const profileTechStackEditAction = async (
  id: string,
  data: {
    startedAt?: Date;
    note?: string;
  },
) => {
  try {
    await getRequiredSession();

    return await prismaClient.userTech.update({
      where: {
        id: id,
      },
      data: {
        startedAt: data.startedAt,
        note: data.note,
      },
    });
  } catch (_error) {
    throw new Error("技術スタックの更新ができませんでした。");
  }
};

/**
 * ユーザーの技術スタック紐づけを解除します。
 * * @param id - 削除対象のUserTech固有ID
 */
export const profileTechStackDeleteAction = async (id: string) => {
  try {
    await getRequiredSession();

    return await prismaClient.userTech.delete({
      where: {
        id: id,
      },
    });
  } catch (_error) {
    throw new Error("技術スタックの削除ができませんでした。");
  }
};
