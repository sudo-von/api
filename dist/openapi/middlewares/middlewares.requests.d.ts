import { ApplyOpenApiRequestMiddlewaresOptions } from "./middlewares.types";
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
export declare const applyOpenApiRequestMiddlewares: ({ apiDoc, app, logger, paths, }: ApplyOpenApiRequestMiddlewaresOptions) => Promise<void>;
//# sourceMappingURL=middlewares.requests.d.ts.map