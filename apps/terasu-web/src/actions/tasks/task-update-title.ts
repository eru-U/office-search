"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * タスクのタイトルを更新する
 */
export const taskUpdateTitle = async (taskId: string, title: string) => {
  try {
    await getRequiredSession();

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: { title },
    });

    return updatedTask;
  } catch (error) {
    console.error("タスクのタイトル更新に失敗しました:", error);
    throw new Error("Failed to update task title");
  }
};
