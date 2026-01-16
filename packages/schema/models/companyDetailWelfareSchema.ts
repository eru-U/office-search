import z from "zod";
import { emptyToNull } from "../lib/edit";

/**
 * 福利厚生のベーススキーマ
 * 年代IDはユーザー入力ではなくシステム側で保管して送信
 */
const companyDetailWelfareBaseSchema = z.object({
  name: z.string().min(1, { message: "福利厚生名を入力してください" }),
  content: z.preprocess(emptyToNull, z.string().nullable()),
});

/**
 * 登録用スキーマ
 */
export const companyDetailWelfareAddSchema = companyDetailWelfareBaseSchema;
export type CompanyDetailWelfareAddTypes = z.infer<
  typeof companyDetailWelfareAddSchema
>;
export type CompanyDetailWelfareAddInput = z.input<
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
