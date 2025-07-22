import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { MyCustomError } from ".";

export class BadRequestError extends MyCustomError {
  constructor(
    message: string = ReasonPhrases.BAD_REQUEST,
    body: Record<string, any> = {}
  ) {
    super(message, StatusCodes.BAD_REQUEST, body);
  }
}
