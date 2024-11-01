// Define the Document interface
export interface Document {
  DocumentID: number;
  Title: string;
  Description: string;
  DocumentType: string;
  Scale: string;
  NodeType: string;
  Stakeholders: string[];
  CreatedAt: string;
  Language: string;
  Pages: number;
  Connections: number;
  Georeference: number[][];
}
