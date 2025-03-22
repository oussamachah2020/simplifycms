import { AxiosInstance } from "axios";
import { Schema, ContentItem, ClientConfig, QueryOptions } from "./types";
declare class Collection {
    private client;
    private name;
    constructor(client: CMSClient, name: string);
    find(options?: QueryOptions): Promise<ContentItem[]>;
    create(data: Record<string, any>): Promise<ContentItem>;
    update(id: string, data: Record<string, any>): Promise<ContentItem>;
    delete(id: string): Promise<void>;
}
export declare class CMSClient {
    api: AxiosInstance;
    constructor(config: ClientConfig);
    migrateSchema(schema: Schema): Promise<void>;
    createContent(content: Record<string, any>, schemaName: string): Promise<ContentItem>;
    collection(name: string): Collection;
}
export {};
