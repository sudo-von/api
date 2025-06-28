import { applyRequestMiddlewares, applyResponseMiddlewares, } from "./middlewares";
import { applyOpenApiRequestMiddlewares, applyOpenApiResponseMiddlewares, } from "./openapi/middlewares";
export class ApiService {
    async init({ apiDoc, app, logger, paths, port, }) {
        try {
            logger.info("Trying to initialize the server.");
            applyRequestMiddlewares({ apiDoc, app, paths, port });
            applyOpenApiRequestMiddlewares({ apiDoc, app, logger, paths });
            applyOpenApiResponseMiddlewares({ app });
            applyResponseMiddlewares({ app, logger });
            this.server = app.listen(port, () => logger.info(`Server connection established successfully on 'PORT:${port}'.`));
        }
        catch (e) {
            const error = e;
            error.message = `Failed to init the server: ${error.message}.`;
            throw error;
        }
    }
    async close({ logger }) {
        try {
            const { server } = this;
            if (!server) {
                logger.warn("Server connection not found.");
                return;
            }
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
            logger.info("Server connection closed successfully.");
        }
        catch (e) {
            const error = e;
            error.message = `Failed to close the server connection: ${error.message}.`;
            throw error;
        }
    }
}
//# sourceMappingURL=service.js.map