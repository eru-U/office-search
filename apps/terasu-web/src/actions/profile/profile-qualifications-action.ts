"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * プロフィールの資格情報を新規に登録します。
 * * @param data - 登録する資格の詳細（名称、取得日）
 */
export const profileQualificationsAddAction = async (data: {
  name: string;
  obtainedDate: Date;
}) => {
  try {
    const { userId } = await getRequiredSession();

    return await prismaClient.qualification.create({
      data: {
        name: data.name,
        obtainedDate: data.obtainedDate,
        userId: userId,
      },
    });
  } catch (_error) {
    console.error("資格の登録に失敗しました", _error);
    throw new Error("資格の登録ができませんでした。");
  }
};

/**
 * 既存の資格情報を更新します。
 * * @param id - 更新対象の資格ID
 * @param data - 更新する内容（名称、取得日）
 */
export const profileQualificationsEditAction = async (
  id: string,
  data: {
    name: string;
    obtainedDate: Date;
  },
) => {
  try {
    const { userId } = await getRequiredSession();

    return await prismaClient.qualification.update({
      where: {
        userId: userId,
        id: id,
      },
      data: {
        name: data.name,
        obtainedDate: data.obtainedDate,
      },
    });
  } catch (_error) {
    console.error("資格の更新に失敗しました", _error);
    throw new Error("資格の更新ができませんでした。");
  }
};

/**
 * 資格情報を削除します。
 * * @param id - 削除対象の資格ID
 */
export const profileQualificationsDeleteAction = async (id: string) => {
  try {
    const { userId } = await getRequiredSession();

    return await prismaClient.qualification.delete({
      where: {
        userId: userId,
        id: id,
      },
    });
  } catch (_error) {
    console.error("資格の削除に失敗しました", _error);
    throw new Error("資格の削除ができませんでした。");
  }
};
