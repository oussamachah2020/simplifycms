export type FieldType =
  | "text"
  | "number"
  | "email"
  | "url"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "multiselect"
  | "image"
  | "file"
  | "richtext"
  | "markdown"
  | "json"
  | "color"
  | "reference";

export interface SchemaField {
  name: string;
  type: FieldType;
  required: boolean;
  description?: string;
}

export interface Schema {
    fields: SchemaField[]
}

export interface ContentItem {
    id: string
    [key: string]: any
}

export interface ClientConfig {
    apiUrl: string
    apiKey: string
    projectId: string
}