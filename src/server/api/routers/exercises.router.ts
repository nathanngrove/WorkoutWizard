import { TRPCError } from "@trpc/server";
import {
  addExerciseSchema,
  addSetToExercise,
  getAllExercisesSchema,
} from "../../../schema/exercise.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const exercisesRouter = createTRPCRouter({
  addExerciseToSession: publicProcedure
    .input(addExerciseSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
      }

      const { name, sessionId, reps, weight } = input;

      const isExerciseOnSession =
        await ctx.prisma.exercisesOnSessions.findFirst({
          where: { sessionId, exercise: { name } },
        });

      if (isExerciseOnSession) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Exercise already exists on this session",
        });
      }

      try {
        const addedExercise = await ctx.prisma.exercisesOnSessions.create({
          data: {
            exercise: {
              connectOrCreate: { create: { name }, where: { name } },
            },
            session: { connect: { id: sessionId } },
          },
        });

        return await ctx.prisma.setsOnExercises.create({
          data: {
            exerciseOnSession: { connect: { id: addedExercise.id } },
            set: {
              connectOrCreate: {
                create: { reps, weight },
                where: { weight_reps: { reps, weight } },
              },
            },
          },
        });
      } catch (e) {
        throw e;
      }
    }),
  addSetToExercise: publicProcedure
    .input(addSetToExercise)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
      }

      const { reps, weight, exerciseId, sessionId } = input;

      try {
        return await ctx.prisma.setsOnExercises.create({
          data: {
            exerciseOnSession: {
              connect: { sessionId_exerciseId: { exerciseId, sessionId } },
            },
            set: {
              connectOrCreate: {
                create: { reps, weight },
                where: { weight_reps: { reps, weight } },
              },
            },
          },
        });
      } catch (e) {
        throw e;
      }
    }),
  getAllExercises: publicProcedure
    .input(getAllExercisesSchema)
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
      }

      const { sessionId } = input;

      try {
        const exercises = await ctx.prisma.exercisesOnSessions.findMany({
          where: { sessionId },
          include: {
            exercise: true,
            setsOnExercises: {
              include: { set: true },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        });
        return exercises;
      } catch (e) {
        throw e;
      }
    }),
});
