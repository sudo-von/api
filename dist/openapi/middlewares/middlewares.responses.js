import { HttpError } from "express-openapi-validator/dist/framework/types";
import { BadRequestError } from "../../errors";
/**
 * Registers middleware that intercepts HTTP errors and normalizes them
 * to conform with the OpenAPI error schema.
 *
 * Responsibilities:
 * - Detects if an error is an instance of `HttpError`.
 * - Converts non-conforming errors into a standardized `BadRequestError`
 *   with detailed information.
 * - Passes through other errors unmodified.
 *
 * This middleware must be registered **after** all route handlers to
 * properly catch and transform errors generated during request processing.
 *
 * @param app - Express application instance where the middleware will be applied.
 */
const configureOpenApiErrorMiddlewares = ({ app, }) => {
    app.use((error, _request, _response, next) => {
        const isInstanceOfOpenApiError = error instanceof HttpError;
        const apiError = isInstanceOfOpenApiError
            ? new BadRequestError({ detail: error.message })
            : error;
        return next(apiError);
    });
};
/**
 * Applies all OpenAPI response middlewares including error normalization.
 *
 * This function currently sets up error handling middleware that ensures
 * outgoing error responses follow the OpenAPI standard error format.
 *
 * Additional response middlewares can be included here in the future.
 *
 * @param options - Configuration options including the Express app instance.
 */
export const applyOpenApiResponseMiddlewares = (options) => {
    configureOpenApiErrorMiddlewares(options);
};
//# sourceMappingURL=middlewares.responses.js.map