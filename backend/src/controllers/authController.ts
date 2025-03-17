// Third party imports
import { Request, Response, NextFunction } from "express";
import { hash } from "bcryptjs";

// User imports
import { catchAsync, createBadRequestError, getTime, SignupI, signupSchema } from "@mono/utils";
import { prisma, User } from "@mono/prisma";

const sendVerificationMail = () => {};

export const signup = catchAsync(async (req: Request<{}, {}, SignupI>, res: Response, next: NextFunction) => {
  // Parsing payload against schema
  const payload = await signupSchema.parseAsync(req.body);

  // Checking if the user alread exist with this email or not
  const user: User | null = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  // User is already verified or signup recently less than 24 hrs
  if (user && (user.isVerified || getTime(user.createdAt, "1", "I") > Date.now())) {
    return next(createBadRequestError("User already exist with this email. Continue to login!!!"));
  }

  res.status(201).json({ status: "success", message: "User created successfully." });

  // If user exist then deleting it if it is not verified within 24 hrs
  if (user) {
    await prisma.user.delete({ where: { email: user.email } });
  }

  // Creating new user
  payload.password = await hash(payload.password, 12);
  await prisma.user.create({ data: { ...payload } });
});
