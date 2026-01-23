"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";
import type { AxisAddTypes } from "@terasu/schema/models/axis/axisAddSchema";

/**
 * 新しい就活軸を登録する関数
 */
export const axisAddAction = async (data: AxisAddTypes) => {
  try {
    const { userId } = await getRequiredSession();

    // 1. データの正規化（前後の空白を削除）
    const normalizedContent = data.content.trim();

    // 2. 重複チェック（同一ユーザー内で大文字小文字を区別せずに検索）
    const existingAxis = await prismaClient.jobHuntingAxis.findFirst({
      where: {
        userId: userId,
        content: {
          equals: normalizedContent,
          mode: "insensitive",
        },
      },
    });

    if (existingAxis) {
      // 重複がある場合はエラーを投げる
      throw new Error("その就活軸は既に登録されています。");
    }

    // 3. 同一優先度内での現在の最大表示順を取得
    const lastAxis = await prismaClient.jobHuntingAxis.findFirst({
      where: {
        userId: userId,
        priorityType: data.priorityType,
      },
      orderBy: { displayOrder: "desc" },
    });

    const nextOrder = (lastAxis?.displayOrder ?? 0) + 1;

    // 4. データベースへ新規作成
    return await prismaClient.jobHuntingAxis.create({
      data: {
        userId: userId,
        content: normalizedContent,
        priorityType: data.priorityType,
        displayOrder: nextOrder,
      },
    });
  } catch (_error) {
    // サーバー側のログには詳細を残し、クライアントには簡潔に伝える
    console.error("[AxisAdd] Error:", _error);
    throw new Error(
      _error instanceof Error ? _error.message : "就活軸の登録に失敗しました。",
    );
  }
};
