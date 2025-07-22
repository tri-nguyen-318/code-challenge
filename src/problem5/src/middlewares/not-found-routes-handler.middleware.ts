import { Request, Response, NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

// Catch-all for undefined routes
const notFoundRoutesHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found",
    error: getReasonPhrase(StatusCodes.NOT_FOUND), // "Not Found"
  });
};

export default notFoundRoutesHandlerMiddleware;
