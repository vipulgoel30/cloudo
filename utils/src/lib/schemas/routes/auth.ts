// Third party imports
import { z } from "zod";

// User imports
import { userSchema } from "../user.js";

export const signupSchema = z
  .object({
    name: userSchema.name,
    email: userSchema.email,
    password: userSchema.password,
    confirmPassword: userSchema.confirmPassword,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirm password do not match!!",
  });

export const loginSchema = z.object({
  email: userSchema.email,
  password: userSchema.password,
});

export type SignupI = z.infer<typeof signupSchema>;
export type LoginI = z.infer<typeof loginSchema>;
