import z from "zod";

export const getSessionSchema = z.object({
  id: z.string(),
});

export const createSessionFromTemplateSchema = z.object({
  exercises: z.array(z.string()),
});

export interface SessionData {
  sessionId: string;
  exerciseId: string;
}

export type getSessionInput = z.TypeOf<typeof getSessionSchema>;
export type createSessionFromTemplateInput = z.TypeOf<
  typeof createSessionFromTemplateSchema
>;
