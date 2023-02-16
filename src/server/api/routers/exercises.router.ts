import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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

      const { name, sessionId } = input;

      try {
        const addedExercise = await ctx.prisma.exercisesOnSessions.create({
          data: {
            exercise: {
              connectOrCreate: { create: { name }, where: { name } },
            },
            session: { connect: { id: sessionId } },
          },
        });
        return addedExercise;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "That exercise is already on this session!",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  getAllExercisesOnSession: publicProcedure
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  getAllExercises: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exercise.findMany();
  }),
});
