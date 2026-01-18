"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * タスクの内容（タイトル・説明文）を更新する
 */
export const taskUpdate = async (
  taskId: string,
  data: {
    title?: string;
    description?: string | null;
  },
) => {
  try {
    await getRequiredSession();

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return updatedTask;
  } catch (error) {
    console.error("タスクの更新に失敗しました:", error);
    throw new Error("Failed to update task");
  }
};
