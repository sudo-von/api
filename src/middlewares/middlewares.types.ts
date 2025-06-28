import { IApiServiceInitOptions } from "../types";

/**
 * Defines the set of options accepted by `applyRequestMiddlewares`.
 *
 * This type is directly aliased from `ConfigureHeaderMiddlewaresOptions`,
 * and includes only the subset of fields from `IApiServiceInitOptions` required
 * to set up request-level middleware (such as CORS and body parsing).
 */
export type ApplyRequestMiddlewaresOptions = ConfigureHeaderMiddlewaresOptions;

/**
 * Defines the set of options accepted by `applyResponseMiddlewares`.
 *
 * This type is directly aliased from `ConfigureErrorMiddlewaresOptions`,
 * and includes only the fields necessary to install global error-handling middleware,
 * such as the Express application and logger service.
 */
export type ApplyResponseMiddlewaresOptions = ConfigureErrorMiddlewaresOptions;

/**
 * Configuration options required to register request-processing middleware.
 *
 * This type omits the `logger` field from `IApiServiceInitOptions`, since logging is
 * not typically required when configuring basic header and body-handling middleware.
 */
export type ConfigureHeaderMiddlewaresOptions = Omit<
  IApiServiceInitOptions,
  "logger"
>;

/**
 * Configuration options required to register error-handling middleware.
 *
 * This type includes only the `app` and `logger` properties from `IApiServiceInitOptions`,
 * as they are the only dependencies required to intercept, log, and format error responses.
 */
export type ConfigureErrorMiddlewaresOptions = Pick<
  IApiServiceInitOptions,
  "app" | "logger"
>;
