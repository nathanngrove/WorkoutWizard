import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

import {
  createUserSchema,
  getUserSchema,
  requestOTPSchema,
  updateUserSchema,
  verifyOTPSchema,
} from "../../../schema/user.schema";
import { sendLoginEmail } from "../../../utils/mailer";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getBaseUrl } from "../../../utils/api";
import { decode, encode } from "../../../utils/base64";
import { signJWT } from "../../../utils/jwt";
import { serialize } from "cookie";

export const usersRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { name, email } = input;
        const user = await ctx.prisma.user.create({
          data: { name, email },
        });

        return user;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Error logging in. Please try again.",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      }
    }),
  getUser: publicProcedure
    .input(getUserSchema)
    .query(async ({ ctx, input }) => {
      const { email } = input;
      return await ctx.prisma.user.findUnique({
        where: { email },
      });
    }),
  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) => {
      //TODO
    }),
  deleteUser: publicProcedure
    .input(getUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      return await ctx.prisma.user.delete({ where: { email } });
    }),
  requestOPT: publicProcedure
    .input(requestOTPSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, redirect } = input;

      const user = await ctx.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Error logging in. Please try again.",
        });
      }

      const existingToken = await ctx.prisma.loginToken.findUnique({
        where: { userId: user.id },
      });

      if (existingToken) {
        const deleted = await ctx.prisma.loginToken.delete({
          where: { userId: user.id },
        });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await sendLoginEmail({
        token: encode(`${token.id}:${user.email}`),
        url: getBaseUrl(),
        email: user.email,
      });

      return true;
    }),
  verifyOTP: publicProcedure
    .input(verifyOTPSchema)
    .query(async ({ ctx, input }) => {
      const decoded = decode(input.hash).split(":");

      const [id, email] = decoded;

      const token = await ctx.prisma.loginToken.findFirst({
        where: { id, user: { email } },
        include: { user: true },
      });

      if (!token) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Error logging in. Please try again.",
        });
      }

      const jwt = signJWT({ email: token.user.email, id: token.user.id });

      ctx.res.setHeader("Set-Cookie", serialize("token", jwt, { path: "/" }));

      return {
        redirect: token.redirect,
      };
    }),
  me: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  deleteUserToken: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Something went wrong.",
      });
    }

    try {
      ctx.res.setHeader("Set-Cookie", serialize("token", "", { path: "/" }));
      const deleted = await ctx.prisma.loginToken.delete({
        where: { userId: ctx.user.id },
      });

      return deleted;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Token not found",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }
  }),
});
