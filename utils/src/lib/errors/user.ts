// User imports
import { createFieldErrorMsgs } from "./error.js";

export const userErr = {
  name: createFieldErrorMsgs({ field: "Name", minLength: 1, maxLength: 100, expectedType: "string" }),
  email: createFieldErrorMsgs({ field: "Email", format: "Invalid email." }),
  password: createFieldErrorMsgs({ field: "Password", minLength: 8, maxLength: 50 }),
  confirmPassword: createFieldErrorMsgs({ field: "Confirm Password", minLength: 8, maxLength: 50 }),
} as const;
