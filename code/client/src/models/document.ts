export class Document {
  documentID: number;
  title: string;
  description: string;
  documentType: string; //same thing as scale
  scale: string;
  nodeType: string;
  stakeholders: string[];
  issuanceDate: string;
  language: string;
  pages: string;
  connections: number;
  georeference: number[][];

  constructor(
    documentID: number,
    title: string,
    description: string,
    documentType: string,
    scale: string,
    nodeType: string,
    stakeholders: string[],
    issuanceDate: string,
    language: string,
    pages: string,
    connections: number,
    georeference: number[][]
  ) {
    this.documentID = documentID;
    this.title = title;
    this.description = description;
    this.documentType = documentType;
    this.scale = scale;
    this.nodeType = nodeType;
    this.stakeholders = stakeholders;
    this.issuanceDate = issuanceDate;
    this.language = language;
    this.pages = pages;
    this.connections = connections;
    this.georeference = georeference;
  }
}
