import { Express, NextFunction, Request, Response } from "express";
import { AbstractLoggerService } from "@sudo-von/logging";
import { IApiError } from "../types";
import { STATUS_CODES } from "../constants";
import { ApiError, InternalServerError } from "../errors";

/**
 * Registers a global error-handling middleware for the API.
 *
 * Responsibilities:
 * - Logs unexpected errors using appropriate severity (`warn` for client errors, `error` for server errors).
 * - Wraps unknown exceptions in a generic `InternalServerError` to ensure consistent error responses.
 * - Sends a structured `IApiError` response to the client in accordance with the application's error format.
 *
 * This middleware must be registered **after** all route definitions to properly handle uncaught errors.
 *
 * @param app - The Express application instance.
 * @param logger - A logger service used to capture error output.
 */
const configureErrorMiddlewares = (
  app: Express,
  logger: AbstractLoggerService
) => {
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response<IApiError>,
      _next: NextFunction
    ) => {
      const isInstanceOfApiError = error instanceof ApiError;

      const apiError = isInstanceOfApiError ? error : new InternalServerError();

      if (apiError.status >= STATUS_CODES.INTERNAL_SERVER_ERROR) {
        logger.error(error);
      } else {
        logger.warn(error.message, error);
      }

      response.status(apiError.status).json({
        code: apiError.code,
        detail: apiError.detail,
        status: apiError.status,
        title: apiError.title,
      });
    }
  );
};

/**
 * Applies middleware for handling standardized API responses.
 *
 * Currently, this function installs the global error-handling middleware.
 * Additional response-related middleware (e.g., compression, headers) can be added here in the future.
 *
 * @param app - The Express application instance.
 * @param logger - A logger service used to capture runtime logs.
 */
export const applyResponseMiddlewares = (
  app: Express,
  logger: AbstractLoggerService
) => {
  configureErrorMiddlewares(app, logger);
};
