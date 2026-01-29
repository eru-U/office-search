"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * タスクのステータスを更新する
 * @param taskId
 * @param newStatus
 * @returns
 */
export const taskUpdateStatus = async (taskId: string, newStatus: string) => {
  try {
    await getRequiredSession();

    // DONEに移動する場合は完了日をセット、それ以外はnullに戻す
    const completedAt = newStatus === "DONE" ? new Date() : null;

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: {
        status: newStatus,
        completedAt: completedAt,
      },
    });

    return updatedTask;
  } catch (error) {
    console.error("ステータス更新に失敗しました", error);
    throw new Error("Failed to update status");
  }
};
