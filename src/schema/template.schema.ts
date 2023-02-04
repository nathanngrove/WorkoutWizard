import z from "zod";

export const createTemplateSchema = z.object({
  name: z.string(),
  exercises: z.array(z.string()),
});

export interface TemplateData {
  templateId: string;
  exerciseId: string;
}

export type createTemplateInput = z.TypeOf<typeof createTemplateSchema>;
