class Document {
  documentId: number;
  title: string;
  description: string;
  documentType: string;
  scale: string;
  nodeType: string;
  stakeholders: string;
  issuanceDate: string | null;
  language: string | null;
  pages: string | null;
  georeferenceId: number | null;
  coordinates: string | null;

  constructor(
    documentId: number,
    title: string,
    description: string,
    documentType: string,
    scale: string,
    nodeType: string,
    stakeholders: string,
    issuanceDate: string | null,
    language: string | null,
    pages: string | null,
    georeferenceId: number | null,
    coordinates: string | null
  ) {
    this.documentId = documentId;
    this.title = title;
    this.description = description;
    this.documentType = documentType;
    this.scale = scale;
    this.nodeType = nodeType;
    this.stakeholders = stakeholders;
    this.issuanceDate = issuanceDate;
    this.language = language;
    this.pages = pages;
    this.georeferenceId = georeferenceId;
    this.coordinates = coordinates;
  }
}

export default Document;
