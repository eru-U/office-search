import z from "zod";

/**
 * 企業理念のベーススキーマ
 */
const companyDetailPhilosophySchema = z.object({
  content: z.string().min(1, "企業理念の内容を入力してください"),
});

/**
 * 企業理念を追加するスキーマ
 */
export const companyDetailPhilosophyAddSchema = companyDetailPhilosophySchema;

export type companyDetailPhilosophyAddTypes = z.infer<
  typeof companyDetailPhilosophyAddSchema
>;
export type companyDetailPhilosophyAddInput = z.input<
  typeof companyDetailPhilosophyAddSchema
>;

/**
 * 企業理念を編集するスキーマ
 */
export const companyDetailPhilosophyEditSchema = companyDetailPhilosophySchema;
export type companyDetailPhilosophyEditTypes = z.infer<
  typeof companyDetailPhilosophyEditSchema
>;
export type companyDetailPhilosophyEditInput = z.input<
  typeof companyDetailPhilosophyEditSchema
>;
