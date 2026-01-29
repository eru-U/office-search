"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * 新しいタスクを TODO ステータスで作成します
 * @param title タスクのタイトル
 */
export const taskCreate = async (title: string) => {
  try {
    const { userId } = await getRequiredSession();

    const newTask = await prismaClient.task.create({
      data: {
        title,
        userId,
        status: "TODO",
      },
    });

    return newTask;
  } catch (error) {
    console.error("タスクの作成に失敗しました:", error);
    throw new Error("Failed to create task");
  }
};
