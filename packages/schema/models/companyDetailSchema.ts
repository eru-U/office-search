import z from "zod";
import { emptyToNull } from "../lib/edit";
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
 * 企業の基本情報を編集するスキーマ
 */
export const basicInfoEditSchema = z.object({
  // 設立年月日
  establishedDate: z.preprocess(emptyToNull, z.coerce.date().nullable()),
  // 資本金
  capital: z.preprocess(emptyToNull, z.coerce.bigint().nullable()),
  // 代表者名
  representative: z.preprocess(emptyToNull, z.string().nullable()),
  // 社員数
  employeeCount: z.preprocess(emptyToNull, z.coerce.number().int().nullable()),
  // 電話番号
  phoneNumber: z.preprocess(emptyToNull, z.string().nullable()),
  // 売上高
  revenue: z.preprocess(emptyToNull, z.coerce.bigint().nullable()),
});
export type BasicInfoEditTypes = z.infer<typeof basicInfoEditSchema>;
export type BasicInfoInput = z.input<typeof basicInfoEditSchema>;
// ============================================================
