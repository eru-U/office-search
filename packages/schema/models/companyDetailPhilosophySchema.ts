import z from "zod";

/**
 * 企業理念のベーススキーマ
 */
const philosophySchema = z.object({
  content: z.string().min(1, "企業理念の内容を入力してください"),
});

/**
 * 企業理念を追加するスキーマ
 */
export const philosophyAddSchema = philosophySchema;

export type PhilosophyAddTypes = z.infer<typeof philosophyAddSchema>;
export type PhilosophyAddInput = z.input<typeof philosophyAddSchema>;

/**
 * 企業理念を編集するスキーマ
 */
export const philosophyEditSchema = philosophySchema;

export type PhilosophyEditTypes = z.infer<typeof philosophyEditSchema>;
export type PhilosophyEditInput = z.input<typeof philosophyEditSchema>;
