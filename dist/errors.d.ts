import { ApiErrorOptions, IApiError, StatusCodeValue } from "./types";
/**
 * Base class for API-related errors conforming to the ApiError interface.
 *
 * It serves as the foundation for more specific HTTP error classes.
 */
export declare class ApiError extends Error implements IApiError {
    code: string;
    detail: string;
    status: StatusCodeValue;
    title: string;
    constructor(error: IApiError);
}
/**
 * Represents a 400 Bad Request error.
 *
 * This error should be thrown when the server cannot process the request due to
 * client-side issues such as validation errors or malformed input.
 */
export declare class BadRequestError extends ApiError {
    constructor(options: ApiErrorOptions);
}
/**
 * Represents a 409 Conflict error.
 *
 * This error should be thrown when a request could not be completed due to a conflict with the current state of the resource.
 * Common use cases include duplicate entries, version conflicts, or violations of business rules.
 */
export declare class ConflictError extends ApiError {
    constructor(options: ApiErrorOptions);
}
/**
 * Represents a 500 Internal Server Error.
 *
 * This error should be thrown when an unexpected failure occurs on the server
 * that is not directly caused by the client's request.
 */
export declare class InternalServerError extends ApiError {
    constructor();
}
//# sourceMappingURL=errors.d.ts.map