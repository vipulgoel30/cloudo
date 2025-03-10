// Third party imports
import { z, EnumLike, ZodNativeEnum, ZodString } from "zod";

// User imports
import { FieldErrorMsgs } from "../errors/error.js";

export const createStringSchema = ({ invalidType, minLength, maxLength, required }: FieldErrorMsgs): ZodString => {
  let schema: z.ZodString = z.string({
    ...(required && { required_error: required }),
    ...(invalidType && { invalid_type_error: invalidType }),
  });

  if (minLength) schema = schema.min(minLength.length, minLength.message);
  if (maxLength) schema = schema.max(maxLength.length, maxLength.message);

  return schema;
};

export const createEnumSchema = (
  { invalidType, required }: FieldErrorMsgs,
  enums: EnumLike
): ZodNativeEnum<EnumLike> => {
  return z.nativeEnum(enums, {
    ...(required && { required_error: required }),
    ...(invalidType && { invalid_type_error: invalidType }),
  });
};
