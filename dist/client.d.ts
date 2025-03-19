import { Schema, ContentItem, ClientConfig } from "./types";
export declare class CMSClient {
    private api;
    constructor(config: ClientConfig);
    migrateSchema(schema: Schema): Promise<void>;
    createContent(content: Record<string, any>, schemaName: string): Promise<ContentItem>;
}
