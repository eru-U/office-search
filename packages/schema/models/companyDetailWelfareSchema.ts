import z, { string } from "zod";
/**
 * 福利厚生のベーススキーマ
 * 年代IDはユーザー入力ではなくシステム側で保管して送信
 */
const companyDetailWelfareBaseSchema = z.object({
  yearlyInfoId: z.string(),
  name: string().min(1, { message: "福利厚生名を入力してください" }),
  content: string().optional().nullable(),
});

/**
 * 登録用スキーマ
 */
export const companyDetailWelfareAddSchema = companyDetailWelfareBaseSchema;
export type CompanyDetailWelfareAddTypes = z.infer<
  typeof companyDetailWelfareAddSchema
>;
export type CompanyDetailWelfareInput = z.input<
  typeof companyDetailWelfareAddSchema
>;

/**
 * 編集用スキーマ
 */
export const companyDetailWelfareEditSchema = companyDetailWelfareBaseSchema;
export type CompanyDetailWelfareEditTypes = z.infer<
  typeof companyDetailWelfareEditSchema
>;
export type CompanyDetailWelfareEditInput = z.input<
  typeof companyDetailWelfareEditSchema
>;
