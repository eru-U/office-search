import z from "zod";

export const taskTitleEditSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
});

export type TaskTitleEditTypes = z.infer<typeof taskTitleEditSchema>;

export const taskDescriptionSchema = z.object({
  description: z.string().nullable(),
});

export type taskDescriptionInput = z.input<typeof taskDescriptionSchema>;
export type taskDescriptionTypes = z.infer<typeof taskDescriptionSchema>;
