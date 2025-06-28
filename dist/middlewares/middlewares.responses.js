import { STATUS_CODES } from "../constants";
import { ApiError, InternalServerError } from "../errors";
/**
 * Installs a global error-handling middleware for API exception management.
 *
 * This middleware captures all unhandled exceptions occurring during the request-response
 * cycle and ensures they are logged and transformed into a consistent error response format.
 *
 * Behavior:
 * - If the error is an instance of `ApiError`, it is passed through as-is.
 * - If the error is unknown, it is wrapped in an `InternalServerError`.
 * - Logs are emitted using different levels depending on the error type:
 *   - `warn` for expected client-side errors (4xx)
 *   - `error` for server-side or unexpected failures (5xx)
 * - The response is returned in the `IApiError` structure.
 *
 * This middleware must be registered **after** all route handlers to properly
 * catch uncaught exceptions.
 *
 * @param app - Express application instance.
 * @param logger - Logger service for structured error reporting.
 */
const configureErrorMiddlewares = ({ app, logger, }) => {
    app.use((error, _request, response, _next) => {
        const isInstanceOfApiError = error instanceof ApiError;
        const apiError = isInstanceOfApiError ? error : new InternalServerError();
        if (apiError.status >= STATUS_CODES.INTERNAL_SERVER_ERROR) {
            logger.error(error);
        }
        else {
            logger.warn(error.message, error);
        }
        response.status(apiError.status).json({
            code: apiError.code,
            detail: apiError.detail,
            status: apiError.status,
            title: apiError.title,
        });
    });
};
/**
 * Registers middleware responsible for producing standardized API responses.
 *
 * This function currently installs global error-handling logic and can be
 * extended to include additional response-focused middleware such as:
 * - Response compression
 * - Security headers
 * - Response time metrics
 *
 * Middleware applied here should run **after** all route handlers but
 * **before** the server sends any final response.
 *
 * @param options - Initialization options including the Express app and logger service.
 */
export const applyResponseMiddlewares = (options) => {
    configureErrorMiddlewares(options);
};
//# sourceMappingURL=middlewares.responses.js.map