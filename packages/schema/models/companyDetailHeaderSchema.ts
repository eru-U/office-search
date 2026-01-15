import z from "zod";

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
