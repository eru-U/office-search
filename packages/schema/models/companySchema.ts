import { z } from "zod";
import { CompanySchema } from "../generated";

/**
 * 企業登録用のスキーマ
 */
export const createCompanySchema = CompanySchema.pick({
  name: true,
}).extend({
  name: z
    .string()
    .min(1, "企業名は1文字以上にしてください")
    .max(100, "企業名は100文字以下にしてください"),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;

/**
 * 企業検索用のスキーマ
 */
export const searchCompanySchema = CompanySchema.pick({
  name: true,
}).extend({
  /**
   * 企業名
   */
  name: z.string().max(100, "企業名は100文字以下にしてください").optional(),
  /**
   * 想定年収
   */
  yearSalary: z.number().min(0, "想定年収は0以上にしてください").optional(),
  /**
   * 業界
   */
  industryName: z
    .string()
    .max(100, "業界は100文字以下にしてください")
    .optional(),
  /**
   * 志望度
   */
  aspirationLevel: z.number().max(5, "志望度は5以下にしてください").optional(),
  /**
   * マッチング度
   */
  score: z.number().max(100, "マッチング度は100以下にしてください").optional(),
});

export type SearchCompanySchema = z.infer<typeof searchCompanySchema>;

/**
 * 企業一覧表示用のスキーマ
 */
export const companyListSchema = CompanySchema.pick({
  name: true,
}).extend({
  /**
   * 企業名
   */
  name: z.string().min(1).max(100),
  /**
   * 想定年収
   * 月収の場合は表示側で12倍してからソートして表示
   */
  yearSalary: z
    .number()
    .min(0)
    .nullable()
    .optional()
    .transform((val) => {
      if (val === null || val === undefined) {
        return "---";
      }
      return val;
    }),
  /**
   * 業界タグ
   * 複数の業界名を配列で取得
   * nullの場合は---表示
   */
  industryName: z
    .array(z.string())
    .nullable()
    .optional()
    .transform((val) => {
      if (val === null || val === undefined || val.length === 0) {
        return ["---"];
      }
      return val;
    }),
  /**
   * 志望度
   * nullの場合は---表示
   */
  aspirationLevel: z
    .number()
    .max(5)
    .nullable()
    .optional()
    .transform((val) => {
      if (val === null || val === undefined) {
        return "---";
      }
      return val;
    }),
  /**
   * マッチング度
   * nullの場合は---表示
   */
  score: z
    .number()
    .max(100)
    .nullable()
    .optional()
    .transform((val) => {
      if (val === null || val === undefined) {
        return "---";
      }
      return val;
    }),
});

export type CompanyListSchema = z.infer<typeof companyListSchema>;
