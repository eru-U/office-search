"use server";

import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * 技術スタックマスタに新しい技術スタックを登録するサーバーアクション
 * @param name - 技術スタック名
 */
export const createTechStackAction = async (name: string) => {
  try {
    const { userId } = await getRequiredSession();
    // 1. 名前を正規化（前後の空白を削除）
    const normalizedName = name.trim();
    // 同名の技術スタックが既に存在するか確認
    const existingTechStack = await prismaClient.techStack.findFirst({
      where: {
        name: {
          equals: normalizedName,
          mode: "insensitive",
        },
        userId: userId,
      },
    });

    if (existingTechStack) {
      return {
        success: false,
        error: "同名の技術スタックが既に存在します",
        data: null,
      };
    }

    // 新規作成
    const newTechStack = await prismaClient.techStack.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    return {
      success: true,
      data: {
        id: newTechStack.id,
        name: newTechStack.name,
      },
      error: null,
    };
  } catch (error) {
    console.error("技術スタックの登録に失敗しました", error);
    return {
      success: false,
      error: "技術スタックの登録に失敗しました",
      data: null,
    };
  }
};
