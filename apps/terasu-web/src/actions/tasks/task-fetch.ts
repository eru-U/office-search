"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * タスクの一覧を取得するサーバーアクション
 */
export const taskFetch = async () => {
  try {
    const { userId } = await getRequiredSession();
    const result = await prismaClient.task.findMany({
      where: {
        userId: userId,
      },
      select: {
        // 一覧表示用
        id: true,
        title: true,
        status: true,
        deadline: true,
        createdAt: true,
        // 詳細表示用
        description: true,
        completedAt: true,
        company: {
          select: {
            name: true,
          },
        },
        schedule: {
          select: {
            title: true,
          },
        },
      },
      orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
    });
    return result;
  } catch (error) {
    console.error("タスクデータの取得に失敗しました", error);
    throw error;
  }
};
