import { STATUS_CODES } from "./constants";
import { ApiErrorOptions, IApiError, StatusCodeValue } from "./types";

/**
 * Base class for API-related errors conforming to the ApiError interface.
 *
 * It serves as the foundation for more specific HTTP error classes.
 */
export class ApiError extends Error implements IApiError {
  code: string;
  detail: string;
  status: StatusCodeValue;
  title: string;

  constructor(error: IApiError) {
    super(error.detail);

    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;
    this.status = error.status;
    this.title = error.title;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents a 400 Bad Request error.
 *
 * This error should be thrown when the server cannot process the request due to
 * client-side issues such as validation errors or malformed input.
 */
export class BadRequestError extends ApiError {
  constructor(options: ApiErrorOptions) {
    super({
      code: options.code || "BAD_REQUEST_ERROR",
      detail:
        options.detail ||
        "The request could not be processed due to invalid input. Please check the provided data.",
      status: STATUS_CODES.BAD_REQUEST,
      title:
        options.title || "There was an error while validating the request.",
    });
  }
}

/**
 * Represents a 409 Conflict error.
 *
 * This error should be thrown when a request could not be completed due to a conflict with the current state of the resource.
 * Common use cases include duplicate entries, version conflicts, or violations of business rules.
 */
export class ConflictError extends ApiError {
  constructor(options: ApiErrorOptions) {
    super({
      code: options.code || "CONFLICT_ERROR",
      detail:
        options.detail ||
        "The request could not be completed due to a conflict with the current state of the resource.",
      status: STATUS_CODES.CONFLICT,
      title: options.title || "Conflict detected while processing the request.",
    });
  }
}

/**
 * Represents a 500 Internal Server Error.
 *
 * This error should be thrown when an unexpected failure occurs on the server
 * that is not directly caused by the client's request.
 */
export class InternalServerError extends ApiError {
  constructor() {
    super({
      code: "INTERNAL_SERVER_ERROR",
      detail:
        "An unexpected error occurred on the server. Please try again later.",
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      title: "Internal Server Error.",
    });
  }
}
