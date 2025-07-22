import { Request, Response, NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { errorLogger } from "../utils/logger";
import { MyCustomError } from "../errors";

const defaultErrorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorLogger.error(`Error occurred: ${err.message} - Stack: ${err.stack}`, {
    label: "DefaultErrorHandler",
  });

  if (err instanceof MyCustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.serializeErrors(),
    });
  }

  const message =
    err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: message,
    message: "An unexpected error occurred",
  });
};

export default defaultErrorHandlerMiddleware;
