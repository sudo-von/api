import { ApplyRequestMiddlewaresOptions } from "./middlewares.types";
/**
 * Applies all necessary middleware for processing incoming HTTP requests.
 *
 * This function sets up low-level middleware such as:
 * - Header configuration (CORS, content-type handling).
 * - JSON body parsing for compliant clients.
 *
 * Additional request-level middleware (e.g., compression, rate limiting) can be
 * added here as the application evolves.
 *
 * @param options - Configuration options including the Express app instance.
 */
export declare const applyRequestMiddlewares: (options: ApplyRequestMiddlewaresOptions) => void;
//# sourceMappingURL=middlewares.requests.d.ts.map