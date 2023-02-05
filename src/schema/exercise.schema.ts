import z from "zod";

export const addExerciseSchema = z.object({
  name: z.string(),
  sessionId: z.string(),
  reps: z.number(),
  weight: z.number(),
});

export const getAllExercisesSchema = z.object({
  sessionId: z.string(),
});

export const addSetToExercise = z.object({
  reps: z.number(),
  weight: z.number(),
  exerciseId: z.string(),
  sessionId: z.string(),
});

export type addExerciseInput = z.TypeOf<typeof addExerciseSchema>;
export type getAllExercisesInput = z.TypeOf<typeof getAllExercisesSchema>;
