// User imports
import { userErr } from "../errors/user.js";
import { createStringSchema } from "./schemas.js";

export const userSchema = {
  name: createStringSchema(userErr.name),
  email: createStringSchema(userErr.email).email(userErr.email.format),
  password: createStringSchema(userErr.password),
  confirmPassword: createStringSchema(userErr.confirmPassword),
} as const;
