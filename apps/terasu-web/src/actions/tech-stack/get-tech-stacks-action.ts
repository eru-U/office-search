"use server";

import { prismaClient } from "@terasu/db";

/**
 * 技術スタックマスタから全データを取得するサーバーアクション
 * コンボボックスやセレクトボックスで利用
 */
export const getTechStacksAction = async () => {
  try {
    const techStacks = await prismaClient.techStack.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // コンボボックスで扱いやすいように label / value 形式に整形して返す
    const options = techStacks.map((techStack) => ({
      label: techStack.name ?? "不明",
      value: techStack.id,
    }));

    return {
      success: true,
      data: options,
    };
  } catch (error) {
    console.error("技術スタックマスタの取得に失敗しました", error);
    return {
      success: false,
      data: [],
      error: "技術スタックデータの取得に失敗しました",
    };
  }
};
