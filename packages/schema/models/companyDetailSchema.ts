import { z } from "zod";

/**
 * 1. Header (Companyモデル) 用スキーマ
 * 修正：websiteUrl を .optional() に変更
 */
export const updateCompanyHeaderSchema = z.object({
  name: z.string().min(1, "企業名は必須です"),
  websiteUrl: z
    .string()
    .url("有効なURL形式で入力してください")
    .or(z.literal(""))
    .nullable()
    .optional(), // キーがなくてもOKにする
});

/**
 * 2. 年度追加 (CompanyYearlyInfoモデル) 用スキーマ
 */
export const createCompanyYearlyInfoSchema = z.object({
  dataDate: z.date({
    error: "データ取得日を選択してください",
  }),
});

/**
 * 3. メモ (Memoモデル) 用スキーマ
 */
export const createMemoSchema = z.object({
  content: z.string().min(1, "メモ内容を入力してください"),
});

/**
 * 4. QA (QAモデル) 用スキーマ
 */
export const createQASchema = z.object({
  question: z.string().min(1, "質問内容を入力してください"),
  answer: z.string().optional().nullable(),
});

/**
 * 5. 基本情報編集用スキーマ
 */
export const updateBasicInfoSchema = z.object({
  establishedDate: z.date().optional().nullable(),
  capital: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  representative: z.string().optional().nullable(),
  employeeCount: z.string().optional().nullable(),
  revenue: z.string().optional().nullable(),
});

/**
 * 6. 給与情報 (Salary / Allowance / Bonusモデル) 編集用スキーマ
 */
export const updateSalarySchema = z.object({
  salaryCategoryId: z.string().min(1, "給与形態を選択してください"),
  amount: z.string().optional().nullable(),
  baseSalary: z.string().optional().nullable(),
  bonusTimesPerYear: z.string().optional().nullable(),
  bonusMonths: z.string().optional().nullable(),
  allowances: z
    .array(
      z.object({
        name: z.string().min(1, "手当名を入力してください"),
        amount: z.string().min(1, "金額を入力してください"),
      }),
    )
    .optional(),
});

/**
 * 7. 企業理念 (CompanyPhilosophyモデル) 編集用スキーマ
 */
export const updateCompanyPhilosophySchema = z.object({
  content: z.string().min(1, "理念内容を入力してください"),
});

/**
 * 8. 福利厚生 (Welfareモデル) 編集用スキーマ
 */
export const createWelfareSchema = z.object({
  name: z.string().min(1, "福利厚生名を入力してください"),
  content: z.string().optional().nullable(),
});

/**
 * 9. 拠点情報 (Branchモデル) 編集用スキーマ
 */
export const createBranchSchema = z.object({
  address: z.string().min(1, "拠点住所を入力してください"),
});

/**
 * 10. 人物情報 (ContactPersonモデル) 編集用スキーマ
 */
export const createContactPersonSchema = z.object({
  position: z.string().min(1, "役職を入力してください"),
  name: z.string().min(1, "氏名を入力してください"),
  description: z.string().optional().nullable(),
});

// --- 型定義 ---
export type UpdateCompanyHeaderSchema = z.infer<
  typeof updateCompanyHeaderSchema
>;
export type CreateCompanyYearlyInfoSchema = z.infer<
  typeof createCompanyYearlyInfoSchema
>;
export type CreateMemoSchema = z.infer<typeof createMemoSchema>;
export type CreateQASchema = z.infer<typeof createQASchema>;
export type UpdateBasicInfoSchema = z.infer<typeof updateBasicInfoSchema>;
export type UpdateSalarySchema = z.infer<typeof updateSalarySchema>;
export type UpdateCompanyPhilosophySchema = z.infer<
  typeof updateCompanyPhilosophySchema
>;
export type CreateWelfareSchema = z.infer<typeof createWelfareSchema>;
export type CreateBranchSchema = z.infer<typeof createBranchSchema>;
export type CreateContactPersonSchema = z.infer<
  typeof createContactPersonSchema
>;
