import { Server } from "http";
import { IApiService, IApiServiceCloseOptions, IApiServiceInitOptions } from "./types";
export declare class ApiService implements IApiService {
    server: Server | undefined;
    init({ apiDoc, app, logger, paths, port, }: IApiServiceInitOptions): Promise<void>;
    close({ logger }: IApiServiceCloseOptions): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map