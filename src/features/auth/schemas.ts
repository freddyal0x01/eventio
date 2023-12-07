import { z } from "zod";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim());

export const SignupInput = z.object({
  email,
  password,
  name: z.string(),
  terms: z.boolean(),
});

export const LoginInput = z
  .object({
    email,
    password: z.string(),
  })
  .strict();
