import * as OpenApiValidator from "express-openapi-validator";
import { initialize } from "express-openapi";
/**
 * Initializes route registration and request binding based on an OpenAPI specification.
 *
 * This function uses a route loader (e.g., `express-openapi`) to:
 * - Dynamically discover and register route handlers from the specified `paths` directory.
 * - Associate each route with its definition in the OpenAPI document (`apiDoc`).
 * - Filter out non-endpoint files (e.g., `errors`, `types`, `mappers`, `test`).
 * - Enable `promiseMode` for async route handlers.
 *
 * @param apiDoc - Path or object representing the OpenAPI document (YAML or JSON).
 * @param app - Express application instance used to mount the discovered routes.
 * @param logger - Logger service used internally by the OpenAPI framework.
 * @param paths - Directory path where API route files are located.
 */
const configureOpenApiMiddlewares = async ({ apiDoc, app, logger, paths, }) => {
    await initialize({
        apiDoc,
        app,
        paths,
        logger,
        pathsIgnore: /^(.*errors|.*index|.*mappers|.*test|.*types)$/,
        promiseMode: true,
        routesGlob: "**/*.{ts,js}",
        routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
        validateApiDoc: true,
    });
};
/**
 * Applies request and response validation middleware based on an OpenAPI spec.
 *
 * This middleware validates all incoming requests and outgoing responses
 * against the provided OpenAPI document. It ensures that:
 * - Required parameters and body formats are respected.
 * - Response structure matches the defined schema.
 *
 * This middleware should be registered **after** all route definitions.
 *
 * @param apiDoc - The OpenAPI specification document.
 * @param app - Express application instance.
 */
const configureOpenApiValidatorMiddlewares = ({ apiDoc, app, }) => {
    app.use(OpenApiValidator.middleware({
        apiSpec: apiDoc,
        validateRequests: true,
        validateResponses: true,
    }));
};
/**
 * Registers all OpenAPI-related middleware needed to support
 * route loading and request/response validation.
 *
 * This function encapsulates the following steps:
 * 1. Dynamically loads routes based on the OpenAPI document and filesystem.
 * 2. Installs validation middleware to enforce compliance with the spec.
 *
 * It must be invoked **before** any business logic is executed
 * to ensure request routing and validation are correctly initialized.
 *
 * @param apiDoc - Path or object representing the OpenAPI specification.
 * @param app - Express application instance.
 * @param logger - Logger used by the OpenAPI initialization layer.
 * @param paths - Directory where API route handler files are located.
 */
export const applyOpenApiRequestMiddlewares = async ({ apiDoc, app, logger, paths, }) => {
    await configureOpenApiMiddlewares({ apiDoc, app, paths, logger });
    configureOpenApiValidatorMiddlewares({ apiDoc, app });
};
//# sourceMappingURL=middlewares.requests.js.map