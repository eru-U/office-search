"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { Prisma, prismaClient } from "@terasu/db"; // Prismaのエラー型をインポート
import { companySchema } from "@terasu/schema";
import { revalidatePath } from "next/cache";

/**
 * 企業を新規登録するサーバーアクション
 */
export async function createCompanyAction(
  data: companySchema.CreateCompanySchema,
) {
  // 1. セッション確認
  const { userId } = await getRequiredSession();

  if (!userId) {
    return {
      success: false,
      error: "認証セッションが切れました。再度ログインしてください。",
    };
  }

  // 2. 共通スキーマによるバリデーション（形式のチェック）
  const result = companySchema.createCompanySchema.safeParse(data);

  if (!result.success) {
    const errorMessage = result.error.message || "入力内容に不備があります。";
    return {
      success: false,
      error: errorMessage,
    };
  }

  try {
    // 3. データベースへの登録
    const company = await prismaClient.company.create({
      data: {
        userId: userId,
        name: result.data.name,
        viewCount: 0,
        isFavorite: false,
      },
    });

    // 4. キャッシュの無効化
    revalidatePath("/companies");

    return {
      success: true,
      id: company.id,
      message: "企業を登録しました。",
    };
  } catch (error) {
    // --- Copilotの指摘対応：一意制約エラーのハンドリング ---
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 は "Unique constraint failed on the fields" のエラーコード
      if (error.code === "P2002") {
        return {
          success: false,
          error:
            "この企業名は既に登録されています。別の名前を入力してください。",
        };
      }
    }

    console.error("企業登録中に予期せぬエラーが発生しました:", error);
    return {
      success: false,
      error:
        "データベースへの登録に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
