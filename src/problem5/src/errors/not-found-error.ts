import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { MyCustomError } from ".";

export class NotFoundError extends MyCustomError {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    body: Record<string, any> = {}
  ) {
    super(message, StatusCodes.NOT_FOUND, body);
  }
}
