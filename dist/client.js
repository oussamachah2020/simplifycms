"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSClient = void 0;
const axios_1 = __importDefault(require("axios"));
class CMSClient {
    constructor(config) {
        const { apiKey, apiUrl, projectId } = config;
        if (!apiUrl || !apiKey || !projectId) {
            throw new Error('apiUrl, apiKey, and projectId are required');
        }
        this.api = axios_1.default.create({
            baseURL: `${apiUrl}/${projectId}`,
            headers: { Authorization: `Bearer ${apiKey}` }
        });
    }
    async migrateSchema(schema) {
        var _a, _b;
        try {
            await this.api.post('/schema/create', schema);
            console.log('Schema migrated successfully');
        }
        catch (error) {
            throw new Error(`Failed to migrate schema: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
        }
    }
    async createContent(content, schemaName) {
        var _a, _b;
        try {
            const response = await this.api.post("/content/create", {
                schemaName,
                data: content,
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to create content: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
        }
    }
}
exports.CMSClient = CMSClient;
