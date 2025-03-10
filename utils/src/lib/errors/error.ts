// Third party imports
import { z } from "zod";

export interface FieldErrorMsgs {
  required?: string;
  minLength?: { length: number; message: string };
  maxLength?: { length: number; message: string };
  invalidType?: string;
  format?: string;
}

export interface CreateFieldErrorMsgsOptions {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  expectedType?: string;
  enums?: z.EnumLike;
  format?: string;
}

export const createFieldErrorMsgs = ({
  field,
  required = true,
  minLength,
  maxLength,
  expectedType = "string",
  enums,
  format,
}: CreateFieldErrorMsgsOptions): FieldErrorMsgs => {
  const enumKeys: string[] | undefined = enums && Object.keys(enums).map((values) => `'${values}'`);

  return {
    ...(required && { required: `Missing required field : ${field}` }),
    ...(minLength && {
      minLength: { length: minLength, message: `${field} too short. At least ${minLength} characters required!` },
    }),
    ...(maxLength && {
      maxLength: { length: maxLength, message: `${field} too long. At most ${maxLength} characters allowed!` },
    }),
    ...(expectedType && { invalidType: `Unexpected type for '${field}'. Expected a ${expectedType}.` }),
    ...(enumKeys && {
      format: `Invalid ${field} value. Must be ${enumKeys.slice(0, -1).join(", ")}${
        enumKeys.length > 1 ? " or " : ""
      }${enumKeys.at(-1)}`,
    }),
    ...(format && { format }),
  };
};
