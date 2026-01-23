"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

type PriorityType = "HIGH" | "MEDIUM" | "LOW";

/**
 * 更新対象の軸データの型定義
 */
interface AxisUpdateItem {
  id: string;
  priorityType: PriorityType;
  displayOrder: number;
}

/**
 * 就活軸の並び順および優先度を一括更新するサーバーアクション。
 * ドラッグ＆ドロップ完了時に、新しい配列の状態をデータベースに同期します。
 */
export const axisUpdateOrderAction = async (items: AxisUpdateItem[]) => {
  try {
    const { userId } = await getRequiredSession();

    // 全ての更新処理を一つのトランザクションで実行
    // これにより、途中でエラーが起きてもデータの不整合が発生しません
    await prismaClient.$transaction(
      items.map((item) =>
        prismaClient.jobHuntingAxis.update({
          where: {
            id: item.id,
            userId: userId, // 所有権の確認を含めるマシーンの防衛本能
          },
          data: {
            priorityType: item.priorityType,
            displayOrder: item.displayOrder,
          },
        }),
      ),
    );

    return { success: true };
  } catch (_error) {
    // 開発者向けに詳細なエラーをログに出力
    console.error("[AxisUpdateOrder] Transaction failed:", _error);

    // ユーザーには冷徹かつ簡潔に失敗を伝える
    throw new Error("並び替え内容の保存に失敗しました。");
  }
};
