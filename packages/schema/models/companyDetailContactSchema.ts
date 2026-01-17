import z from "zod";
import { emptyToNull } from "../lib/edit";

export const companyDetailContactSchema = z.object({
  name: z.string().min(1, "氏名は必須です"),
  position: z.string().min(1, "役職は必須です"),
  description: z.preprocess(emptyToNull, z.string().nullable()),
});

export type CompanyDetailContactTypes = z.infer<
  typeof companyDetailContactSchema
>;

export type CompanyDetailContactInput = z.input<
  typeof companyDetailContactSchema
>;
