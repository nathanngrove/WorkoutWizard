import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const getUserSchema = z.object({
  email: z.string().email(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const requestOTPSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default("/"),
});

export const verifyOTPSchema = z.object({ hash: z.string() });

export type createUserInput = z.TypeOf<typeof createUserSchema>;
export type createUserOutput = z.TypeOf<typeof createUserOutputSchema>;

export type getUserInput = z.TypeOf<typeof getUserSchema>;
export type grequestOTPInput = z.TypeOf<typeof requestOTPSchema>;

export type updateUserInput = z.TypeOf<typeof updateUserSchema>;
