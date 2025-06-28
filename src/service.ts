import { Server } from "http";
import {
  IApiService,
  IApiServiceCloseOptions,
  IApiServiceInitOptions,
} from "./types";
import {
  applyRequestMiddlewares,
  applyResponseMiddlewares,
} from "./middlewares";
import {
  applyOpenApiRequestMiddlewares,
  applyOpenApiResponseMiddlewares,
} from "./openapi/middlewares";

export class ApiService implements IApiService {
  server: Server | undefined;

  async init({
    apiDoc,
    app,
    logger,
    paths,
    port,
  }: IApiServiceInitOptions): Promise<void> {
    try {
      logger.info("Trying to initialize the server.");

      applyRequestMiddlewares({ apiDoc, app, paths, port });
      applyOpenApiRequestMiddlewares({ apiDoc, app, logger, paths });
      applyOpenApiResponseMiddlewares({ app });
      applyResponseMiddlewares({ app, logger });

      this.server = app.listen(port, () =>
        logger.info(
          `Server connection established successfully on 'PORT:${port}'.`
        )
      );
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to init the server: ${error.message}.`;
      throw error;
    }
  }

  async close({ logger }: IApiServiceCloseOptions): Promise<void> {
    try {
      const { server } = this;

      if (!server) {
        logger.warn("Server connection not found.");
        return;
      }

      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });

      logger.info("Server connection closed successfully.");
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to close the server connection: ${error.message}.`;
      throw error;
    }
  }
}
