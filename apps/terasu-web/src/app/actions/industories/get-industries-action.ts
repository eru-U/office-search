"use server";

import { prismaClient } from "@terasu/db";

/**
 * 業界マスタから全データを取得するサーバーアクション
 * コンボボックスやセレクトボックスで利用
 */
export async function getIndustriesAction() {
  try {
    const industries = await prismaClient.industry.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    // コンボボックスで扱いやすいように label / value 形式に整形して返す
    const options = industries.map((industry) => ({
      label: industry.name,
      value: industry.id,
    }));

    return {
      success: true,
      data: options,
    };
  } catch (error) {
    console.error("業界マスタの取得に失敗しました", error);
    return {
      success: false,
      data: [],
      error: "業界データの取得に失敗しました",
    };
  }
}
