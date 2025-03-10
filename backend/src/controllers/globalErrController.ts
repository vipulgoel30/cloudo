// Third party imports
import { Request, Response, NextFunction } from "express";

// User imports
import { AppError } from "@mono/utils";

const globalErrController = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let message: string = err.message;
  let statusCode: number = 500;

  if (err instanceof AppError) {
    ({ message, statusCode } = err);
  } else {
  }

  res.status(statusCode).json({
    status: AppError.getStatus(statusCode),
    message,
  });
};

export default globalErrController;
