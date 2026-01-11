"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";
import { createCompanySchema, type CreateCompanySchema } from "@terasu/schema";
import { revalidatePath } from "next/cache";

/**
 * 企業を新規登録するサーバーアクション
 */
export async function createCompanyAction(data: CreateCompanySchema) {
  // 1. セッション確認（バックエンドでの門番）
  const { userId } = await getRequiredSession();

  if (!userId) {
    return {
      success: false,
      error: "認証セッションが切れました。再度ログインしてください。",
    };
  }

  // 2. 共通スキーマによるバリデーション
  const result = createCompanySchema.safeParse(data);

  if (!result.success) {
    // ZodErrorから最初のメッセージを抽出
    const errorMessage = result.error.message || "入力内容に不備があります。";
    return {
      success: false,
      error: errorMessage,
    };
  }

  try {
    // 3. データベースへの登録
    // userId はクライアントから送らせず、サーバー側で取得したものをセットするのが鉄則
    const company = await prismaClient.company.create({
      data: {
        userId: userId,
        name: result.data.name,
        // 他の初期値（Prisma側でデフォルト値があれば省略可能）
        viewCount: 0,
        isFavorite: false,
        establishedDate: new Date(),
      },
    });

    // 4. 一覧画面のキャッシュを無効化
    revalidatePath("/companies");

    return {
      success: true,
      id: company.id,
      message: "企業を登録しました。",
    };
  } catch (error) {
    console.error("企業登録中に予期せぬエラーが発生しました:", error);
    return {
      success: false,
      error:
        "データベースへの登録に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
