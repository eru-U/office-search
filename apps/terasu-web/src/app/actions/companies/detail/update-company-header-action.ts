"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { Prisma, prismaClient } from "@terasu/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * ヘッダー編集用のバリデーションスキーマ
 */
const updateHeaderSchema = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .min(1, "企業名は1文字以上にしてください")
    .max(100, "企業名は100文字以下にしてください"),
  websiteUrl: z
    .string()
    .url("有効なURLを入力してください")
    .or(z.literal(""))
    .nullable(),
});

type UpdateHeaderSchema = z.infer<typeof updateHeaderSchema>;

/**
 * 企業ヘッダー情報（名前・URL）を更新するサーバーアクション
 */
export async function updateCompanyHeaderAction(data: UpdateHeaderSchema) {
  const { userId } = await getRequiredSession();

  if (!userId) {
    return { success: false, error: "認証が必要です。" };
  }

  const result = updateHeaderSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.message };
  }

  try {
    await prismaClient.company.update({
      where: {
        id: result.data.id,
        userId: userId, // 所有権の確認も含める
      },
      data: {
        name: result.data.name,
        websiteUrl: result.data.websiteUrl,
      },
    });

    revalidatePath(`/companies/${result.data.id}`);
    revalidatePath("/companies");

    return { success: true, message: "ヘッダー情報を更新しました。" };
  } catch (error) {
    // ユニーク制約違反のハンドリング
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: "この企業名は既に他の登録で使用されています。",
        };
      }
    }

    console.error("ヘッダー更新エラー:", error);
    return {
      success: false,
      error: "更新に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
