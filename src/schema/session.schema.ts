import z from "zod";

export const getSessionSchema = z.object({
  id: z.string(),
});

export type getSessionInput = z.TypeOf<typeof getSessionSchema>;
