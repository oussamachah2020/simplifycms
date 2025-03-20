import axios, { AxiosInstance } from "axios"
import { Schema, ContentItem, ClientConfig } from "./types"

export class CMSClient {
    private api: AxiosInstance;

    constructor(config: ClientConfig) {
        const {apiKey, apiUrl, projectId} = config
        if (!apiUrl || !apiKey || !projectId) {
            throw new Error('apiUrl, apiKey, and projectId are required');
        }

        this.api = axios.create({
            baseURL: `${apiUrl}/${projectId}`,
            headers: {Authorization: `Bearer ${apiKey}`}
        })
    }

    async migrateSchema(schema: Schema): Promise<void> {
        try {
            await this.api.post('/schema/create', schema)
            console.log('Schema migrated successfully');
        } catch (error: any) {
            throw new Error(`Failed to migrate schema: ${error.response?.data?.message || error.message}`);
        }
    }

    async createContent(content: Record<string, any>, schemaName: string): Promise<ContentItem> {
        try {
            const response = await this.api.post("/content/create", {
              schemaName,
              data: content,
            });
      return response.data;
        } catch (error: any) {
            throw new Error(`Failed to create content: ${error.response?.data?.message || error.message}`);
        }
    }
}