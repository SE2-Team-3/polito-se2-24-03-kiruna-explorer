class DocumentDetail {
  documentId: number;
  title: string;
  description: string;
  documentType: string;
  scale: string;
  nodeType: string;
  stakeholders: string[];
  issuanceDate: string;
  language: string;
  pages: string;
  coordinates: [number, number][];
  resources: Resource[];
  attachments: Attachment[];
  linkedDocuments: LinkedDocument[];

  constructor(
    documentId: number,
    title: string,
    description: string,
    documentType: string,
    scale: string,
    nodeType: string,
    stakeholders: string[],
    issuanceDate: string,
    language: string,
    pages: string,
    coordinates: [number, number][],
    resources: Resource[],
    attachments: Attachment[],
    linkedDocuments: LinkedDocument[]
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
    this.coordinates = coordinates;
    this.resources = resources;
    this.attachments = attachments;
    this.linkedDocuments = linkedDocuments;
  }
}

class Resource {
  resourceId: number;
  fileType: string;
  fileName: string;
  data: { type: string; data: number[] };

  constructor(
    resourceId: number,
    fileType: string,
    fileName: string,
    data: { type: string; data: number[] }
  ) {
    this.resourceId = resourceId;
    this.fileType = fileType;
    this.fileName = fileName;
    this.data = data;
  }
}

class Attachment {
  attachmentId: number;
  fileType: string;
  fileName: string;
  data: { type: string; data: number[] };

  constructor(
    attachmentId: number,
    fileType: string,
    fileName: string,
    data: { type: string; data: number[] }
  ) {
    this.attachmentId = attachmentId;
    this.fileType = fileType;
    this.fileName = fileName;
    this.data = data;
  }
}

class LinkedDocument {
  documentId: number;
  title: string;
  connection: string;

  constructor(documentId: number, title: string, connection: string) {
    this.documentId = documentId;
    this.title = title;
    this.connection = connection;
  }
}

export default DocumentDetail;
