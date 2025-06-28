import { ApplyResponseMiddlewaresOptions } from "./middlewares.types";
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
export declare const applyResponseMiddlewares: (options: ApplyResponseMiddlewaresOptions) => void;
//# sourceMappingURL=middlewares.responses.d.ts.map