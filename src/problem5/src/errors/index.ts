import { StatusCodes } from "http-status-codes";

export class MyCustomError extends Error {
  statusCode: number;
  body: Record<string, any>;

  constructor(
    message: string = "Internal Server Error",
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    body: Record<string, any> = {}
  ) {
    console.log("🚀 ~ MyCustomError ~ message:", message);
    super(message);

    // ✅ Fix prototype chain
    this.statusCode = statusCode;
    this.body = body;
  }

  serializeErrors() {
    return { message: this.message, ...this.body };
  }
}
