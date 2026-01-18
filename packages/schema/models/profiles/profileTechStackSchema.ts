import z from "zod";
import { emptyToNull } from "../../lib/edit";

/**
 * 技術スタック登録（追加）用のスキーマ
 * 全ての項目が必要な場合に使用
 */
export const profileTechStackCreateSchema = z.object({
  techStackId: z.string().min(1, "技術スタックを入力してください"),
  startedAt: z.date({
    message: "有効な日付を選択してください",
  }),
  note: z.preprocess(emptyToNull, z.string().nullable()),
});

/**
 * 技術スタック編集用のスキーマ
 * 技術スタック自体は変更不可とし、開始日とメモのみを許容
 */
export const profileTechStackUpdateSchema = z.object({
  startedAt: z.date({
    message: "有効な日付を選択してください",
  }),
  note: z.preprocess(emptyToNull, z.string().nullable()),
});

/**
 * 追加用型定義
 */
export type ProfileTechStackCreateInput = z.input<
  typeof profileTechStackCreateSchema
>;

/**
 * 編集用型定義
 */
export type ProfileTechStackUpdateInput = z.input<
  typeof profileTechStackUpdateSchema
>;
