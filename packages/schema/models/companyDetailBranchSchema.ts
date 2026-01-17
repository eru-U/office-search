import z from "zod";

/**
 * 企業拠点・支店 用スキーマ
 */
export const companyDetailBranchSchema = z.object({
  address: z.string().min(1, "拠点・支店の住所は必須です"),
});

export type CompanyDetailBranchTypes = z.infer<
  typeof companyDetailBranchSchema
>;
