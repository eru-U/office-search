import z from "zod";

export const axisAddSchema = z.object({
  content: z.string().min(1, "軸の内容は1文字以上で入力してください"),
  priorityType: z.enum(["HIGH", "MEDIUM", "LOW"]),
});

export type AxisAddTypes = z.infer<typeof axisAddSchema>;
