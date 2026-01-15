import { z } from "zod";
import { emptyToNull } from "../lib/edit"

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
/**
 * 年度を追加するスキーマ
 */ 
export const yearlyAddSchema = z.object({
  dataDate: z.string().min(1, "日付を選択してください"),
});
export type YearlyAddTypes = z.infer<typeof yearlyAddSchema>;
// ============================================================
/**
 * 企業の基本情報を登録するスキーマ
 */
export const basicInfoEditSchema = z.object({
  // 設立年月日
  establishedDate: z.preprocess(emptyToNull, z.coerce.date().nullable()),
  // 資本金
  capital: z.preprocess(
    emptyToNull, 
    z.union([z.string(), z.number(), z.bigint()]).transform(v => BigInt(v)).nullable()
  ),
  // 代表者名
  representative: z.preprocess(emptyToNull, z.string().nullable()),
  // 社員数
  employeeCount: z.preprocess(emptyToNull, z.coerce.number().int().nullable()),
  // 電話番号
  phoneNumber: z.preprocess(emptyToNull, z.string().nullable()),
  // 売上高
  revenue: z.preprocess(
    emptyToNull,
    z.union([z.string(), z.number(), z.bigint()]).transform(v => BigInt(v)).nullable()
  ),
});
export type BasicInfoEditTypes = z.infer<typeof basicInfoEditSchema>;
export type BasicInfoOutput = z.output<typeof basicInfoEditSchema>;
export type BasicInfoInput = z.input<typeof basicInfoEditSchema>;
// ============================================================