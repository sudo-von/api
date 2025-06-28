import cors from "cors";
import express from "express";
/**
 * Registers global middleware for handling HTTP headers and request payloads.
 *
 * Responsibilities:
 * - Enables Cross-Origin Resource Sharing (CORS) with default settings.
 * - Parses incoming requests with `application/vnd.api+json` content type as JSON.
 *
 * This middleware should be applied **before** any route or error handlers
 * to ensure headers and body content are properly processed.
 *
 * @param app - The Express application instance.
 */
const configureHeaderMiddlewares = ({ app, }) => {
    app.use(cors());
    app.use(express.json({ type: "application/vnd.api+json" }));
};
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
export const applyRequestMiddlewares = (options) => {
    configureHeaderMiddlewares(options);
};
//# sourceMappingURL=middlewares.requests.js.map