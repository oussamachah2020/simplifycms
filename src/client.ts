import axios, { AxiosInstance } from "axios"
import { Schema, ContentItem, ClientConfig, QueryOptions } from "./types";

class Collection {
  private client: CMSClient;
  private name: string;

  constructor(client: CMSClient, name: string) {
    this.client = client;
    this.name = name;
  }

  async find(options: QueryOptions = {}): Promise<ContentItem[]> {
    try {
      const params = {
        where: options.where ? JSON.stringify(options.where) : undefined,
        select: options.select ? JSON.stringify(options.select) : undefined,
        limit: options.limit ? JSON.stringify(options.limit) : undefined,
        offset: options.offset,
        sort: options.sort
          ? `${options.sort.field}:${options.sort.order}`
          : undefined,
      };

      const response = await this.client.api.get("/content", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to query ${this.name}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  async create(data: Record<string, any>): Promise<ContentItem> {
    try {
      const response = await this.client.api.post(`/content`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to create in ${this.name}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  async update(id: string, data: Record<string, any>): Promise<ContentItem> {
    try {
      const response = await this.client.api.put(`/content/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to update in ${this.name}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.client.api.delete(`/content/${id}`);
      console.log(`Deleted item ${id} from ${this.name}`);
    } catch (error: any) {
      throw new Error(
        `Failed to delete from ${this.name}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }
}

export class CMSClient {
  public api: AxiosInstance;

  constructor(config: ClientConfig) {
    const { apiKey, apiUrl, projectId } = config;
    if (!apiUrl || !apiKey || !projectId) {
      throw new Error("apiUrl, apiKey, and projectId are required");
    }

    this.api = axios.create({
      baseURL: `${apiUrl}/${projectId}`,
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  async migrateSchema(schema: Schema): Promise<void> {
    try {
      await this.api.post("/schema/create", schema);
      console.log("Schema migrated successfully");
    } catch (error: any) {
      throw new Error(
        `Failed to migrate schema: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  async createContent(
    content: Record<string, any>,
    schemaName: string
  ): Promise<ContentItem> {
    try {
      const response = await this.api.post("/content/create", {
        schemaName,
        data: content,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to create content: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  collection(name: string): Collection {
    return new Collection(this, name);
  }
}