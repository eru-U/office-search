import z from "zod";

/**
 * 保有資格登録、編集用のスキーマ
 */
export const profileQualificationSchema = z.object({
  name: z.string().min(1, "資格名称を入力してください"),
  obtainedDate: z.date({
    error: "有効な日付を選択してください",
  }),
});

export type ProfileQualificationTypes = z.infer<
  typeof profileQualificationSchema
>;
