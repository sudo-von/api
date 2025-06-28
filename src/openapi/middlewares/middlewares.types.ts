import { IApiServiceInitOptions } from "../../types";

/**
 * Combined options required to initialize and apply all OpenAPI request middlewares.
 *
 * This type merges both route-loading (`ConfigureOpenApiMiddlewaresOptions`)
 * and request/response validation (`ConfigureOpenApiValidatorMiddlewaresOptions`)
 * configurations to support a full OpenAPI-based middleware pipeline.
 *
 * Used by `applyOpenApiRequestMiddlewares` to bootstrap all OpenAPI-related behavior.
 */
export type ApplyOpenApiRequestMiddlewaresOptions =
  ConfigureOpenApiMiddlewaresOptions &
    ConfigureOpenApiValidatorMiddlewaresOptions;

/**
 * Alias for the options used to apply OpenAPI response middlewares.
 *
 * These middlewares typically handle error formatting and responses
 * for OpenAPI validation errors and other related issues.
 */
export type ApplyOpenApiResponseMiddlewares =
  ConfigureOpenApiErrorMiddlewaresOptions;

/**
 * Configuration options required to register OpenAPI error-handling middleware.
 *
 * Currently, only the Express application instance is required to attach
 * middleware that manages error responses related to OpenAPI validation failures.
 */
export type ConfigureOpenApiErrorMiddlewaresOptions = Pick<
  IApiServiceInitOptions,
  "app"
>;

/**
 * Options required to configure OpenAPI-based dynamic route loading.
 *
 * This configuration is used to initialize an OpenAPI-compatible router, which:
 * - Loads routes based on OpenAPI operation definitions.
 * - Mounts route handlers from the filesystem.
 * - Optionally validates the OpenAPI document on startup.
 *
 * Typically used with `express-openapi` or similar tools.
 */
export type ConfigureOpenApiMiddlewaresOptions = Pick<
  IApiServiceInitOptions,
  "apiDoc" | "app" | "paths" | "logger"
>;

/**
 * Options required to configure OpenAPI request and response validation middleware.
 *
 * This configuration is used to enforce OpenAPI schema compliance at runtime
 * by validating incoming requests and outgoing responses against the provided
 * OpenAPI document.
 *
 * Typically used with `express-openapi-validator` or similar middleware.
 */
export type ConfigureOpenApiValidatorMiddlewaresOptions = Pick<
  IApiServiceInitOptions,
  "apiDoc" | "app"
>;
