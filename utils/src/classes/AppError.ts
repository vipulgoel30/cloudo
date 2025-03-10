export const DEFAULT_ERROR_MESSAGE: string = "Uhhh!!! Something went wrong.";

export class AppError extends Error {
  constructor(public readonly message: string, public readonly statusCode: number) {
    super(message);
  }

  static getStatus(statusCode: number): string {
    return statusCode >= 400 && statusCode < 500 ? "fail" : "error";
  }
}

export const createError =
  (statusCode: number) =>
  (message: string): AppError =>
    new AppError(message, statusCode);

type CreateErrorReturnType = ReturnType<typeof createError>;

export const createBadRequestError: CreateErrorReturnType = createError(400);
export const createUnauthorizedError: CreateErrorReturnType = createError(401);
export const createForbiddenError: CreateErrorReturnType = createError(403);
export const createNotFoundError: CreateErrorReturnType = createError(404);
export const InternalServerError: AppError = createError(500)(DEFAULT_ERROR_MESSAGE);
