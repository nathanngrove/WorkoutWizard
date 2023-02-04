import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { getSessionSchema } from "../../../schema/session.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const sessionsRouter = createTRPCRouter({
  addSession: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
    }

    const session = await ctx.prisma.session.create({
      data: {
        userId: ctx.user.id,
      },
    });
    return session;
  }),
  getSession: publicProcedure
    .input(getSessionSchema)
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
      }

      try {
        const session = ctx.prisma.session.findFirst({
          where: { id: input.id },
          include: { exercises: true },
        });
        return session;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Session not found",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      }
    }),
  getAllSessions: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
    }

    return await ctx.prisma.session.findMany({
      where: { userId: ctx.user.id },
      include: {
        exercises: {
          include: { exercise: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),
  deleteSession: publicProcedure
    .input(getSessionSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
      }

      const { id } = input;

      return await ctx.prisma.session.delete({
        where: { id },
      });
    }),
});
