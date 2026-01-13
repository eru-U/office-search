import { z } from "zod";

// ============================================================
/**
 * 1. Header (Companyモデル) 用スキーマ
 * 修正：websiteUrl を .optional() に変更
 */
export const companyDetailHeaderEditSchema = z.object({
  name: z.string().min(1, "企業名は必須です"),
  websiteUrl: z
    .string()
    .url("有効なURL形式で入力してください")
    .or(z.literal(""))
    .nullable()
    .optional(), // キーがなくてもOKにする
});

export type CompanyDetailHeaderEditTypes = z.infer<
  typeof companyDetailHeaderEditSchema
>;
// ============================================================
/**
 * メモ（Memoモデル）用スキーマ
 * 追加も編集もこのスキーマを使用する
 */
export const companyMemoSchema = z.object({
  content: z.string().min(1, "メモ内容を入力してください"),
});

export type CompanyMemoTypes = z.infer<typeof companyMemoSchema>;
// ============================================================
/**
 * 4. QA (QAモデル) 用スキーマ
 */
export const createQASchema = z.object({
  question: z.string().min(1, "質問内容を入力してください"),
  answer: z.string().optional().nullable(),
});

export type CreateQATypes = z.infer<typeof createQASchema>;
// ============================================================
