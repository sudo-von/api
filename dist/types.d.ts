import { Express } from "express";
import { ICoreService } from "@sudo-von/core";
import { AbstractLoggerService } from "@sudo-von/logging";
import { STATUS_CODES } from "./constants";
/**
 * Defines the standardized structure for error responses returned by the API.
 *
 * Ensures consistent formatting and semantics across all error responses.
 */
export interface IApiError {
    /**
     * A machine-readable error identifier, typically used for programmatic handling.
     */
    code: string;
    /**
     * A detailed, human-readable description of the error.
     */
    detail: string;
    /**
     * The associated HTTP status code.
     */
    status: StatusCodeValue;
    /**
     * A brief summary of the error type.
     */
    title: string;
}
/**
 * Core interface for the API service.
 *
 * Extends the standard lifecycle interface with API-specific initialization and close options.
 */
export interface IApiService extends ICoreService<IApiServiceInitOptions, IApiServiceCloseOptions> {
}
/**
 * Configuration options required to close the API service.
 */
export interface IApiServiceCloseOptions {
    /**
     * Logging service used internally by the API for structured output and diagnostics.
     */
    logger: AbstractLoggerService;
}
/**
 * Configuration options required to initialize the API service.
 */
export interface IApiServiceInitOptions {
    /**
     * Absolute path or URL to the API documentation (e.g., OpenAPI/Swagger).
     */
    apiDoc: string;
    /**
     * The Express application instance to mount routes on.
     */
    app: Express;
    /**
     * Logging service used internally by the API for structured output and diagnostics.
     */
    logger: AbstractLoggerService;
    /**
     * Directory path where route handler files are located.
     */
    paths: string;
    /**
     * Port number for the API server to listen on.
     */
    port: number;
}
/**
 * A partial representation of an API error, omitting the `statusCode` field.
 *
 * Useful for building reusable error templates.
 */
export type ApiErrorOptions = Partial<Omit<IApiError, "statusCode">>;
/**
 * A union of all defined HTTP status code keys from `STATUS_CODES`.
 *
 * Each key represents a semantic label for a numeric HTTP status.
 */
export type StatusCodeKey = keyof typeof STATUS_CODES;
/**
 * A union of all numeric HTTP status code values from `STATUS_CODES`.
 */
export type StatusCodeValue = (typeof STATUS_CODES)[StatusCodeKey];
//# sourceMappingURL=types.d.ts.map