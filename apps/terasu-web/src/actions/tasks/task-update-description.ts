"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * タスクの説明文を更新する
 */
export const taskUpdateDescription = async (
  taskId: string,
  description: string | null,
) => {
  try {
    await getRequiredSession();

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: { description },
    });

    return updatedTask;
  } catch (error) {
    console.error("タスクの説明更新に失敗しました:", error);
    throw new Error("Failed to update task description");
  }
};
