import { TRPCError } from "@trpc/server";
import {
  createTemplateSchema,
  type TemplateData,
} from "../../../schema/template.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const templatesRouter = createTRPCRouter({
  createTemplate: publicProcedure
    .input(createTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
      }

      const { name, exercises } = input;

      const data: Array<TemplateData> = [];

      const template = await ctx.prisma.template.create({
        data: { name, userId: ctx.user.id },
      });

      exercises.forEach((exercise) => {
        data.push({ templateId: template.id, exerciseId: exercise });
      });

      return await ctx.prisma.exercisesOnTemplates.createMany({
        data: [...data],
      });
    }),
  getAllTemplates: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "No user found" });
    }

    return await ctx.prisma.template.findMany({
      where: { userId: ctx.user.id },
      include: { exercises: { include: { exercise: true } } },
      orderBy: { createdAt: "desc" },
    });
  }),
});
