import { ApplyOpenApiResponseMiddlewares } from "./middlewares.types";
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
export declare const applyOpenApiResponseMiddlewares: (options: ApplyOpenApiResponseMiddlewares) => void;
//# sourceMappingURL=middlewares.responses.d.ts.map