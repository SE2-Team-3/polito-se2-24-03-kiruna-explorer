import { InvalidCoordinatesError } from "../errors/georeferenceError";
import DocumentDAO from "../dao/documentDAO";
import { InvalidLinkError } from "../errors/documentError";
import { Utility } from "../utilities";

/**
 * Represents a controller for managing documents.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class DocumentController {
  private documentDAO: DocumentDAO;

  constructor() {
    this.documentDAO = new DocumentDAO();
  }

  async createDocument(
    title: string,
    description: string,
    documentType: string,
    scale: string,
    nodeType: string,
    stakeholders: string[],
    issuanceDate: string | null,
    language: string | null,
    pages: string | null,
    georeference: string[] | null,
    georeferenceName: string | null
  ): Promise<any> {

    issuanceDate=Utility.emptyFixer(issuanceDate)
    language=Utility.emptyFixer(language)
    pages=Utility.emptyFixer(pages)

    return this.documentDAO.createDocument(
      title,
      description,
      documentType,
      scale,
      nodeType,
      stakeholders,
      issuanceDate,
      language,
      pages,
      georeference,
      georeferenceName
    );
  }

  async linkDocuments(
    documentId1: number,
    documentId2: number,
    linkType: string
  ): Promise<boolean> {
    if (documentId1 == documentId2) throw new InvalidLinkError();
    return this.documentDAO.linkDocuments(documentId1, documentId2, linkType);
  }

  async getDocuments(): Promise<any> {
    return this.documentDAO.getDocuments();
  }

  async georeferenceDocument(
    documentId: number,
    georeference: string[]
  ): Promise<boolean> {
    if (georeference == null) throw new InvalidCoordinatesError();
    return this.documentDAO.georeferenceDocument(documentId, georeference);
  }

  async uploadResource(documentId: number, files: Express.Multer.File[]): Promise<any> {
    if (!files || files.length === 0) throw new Error("No files uploaded");
    return this.documentDAO.uploadResource(documentId, files);
  }

  async getResource(resourceId: number): Promise<any> {
    return this.documentDAO.getResourceById(resourceId);
  }

  async getResources(documentId: number): Promise<any[]> {
    if (!documentId || documentId <= 0) {
      throw new Error("Invalid documentId");
    }
    return this.documentDAO.getResourcesByDocumentId(documentId);
  }

  async getFilteredDocuments(filters: {
    title?: string;
    documentType?: string;
    nodeType?: string;
    stakeholders?: string[];
    issuanceDate?: string;
    language?: string;
  }): Promise<any[]> {
    return this.documentDAO.getFilteredDocuments(filters);
  }

  async getConnections(): Promise<any> {
    return this.documentDAO.getConnections();
  }

  async getConnectionsById(documentId: number): Promise<any[]> {
    return this.documentDAO.getConnectionsById(documentId);
  }

  async getGeoreferences(isArea?: boolean): Promise<any[]> {
    return this.documentDAO.getGeoreferences(isArea);
  }

  async createDocumentWithExistingGeoreference(
    title: string,
    description: string,
    documentType: string,
    scale: string,
    nodeType: string,
    stakeholders: string[],
    issuanceDate: string | null,
    language: string | null,
    pages: string | null,
    georeferenceId: number | null
  ): Promise<any> {

    issuanceDate=Utility.emptyFixer(issuanceDate)
    language=Utility.emptyFixer(language)
    pages=Utility.emptyFixer(pages)

    return this.documentDAO.createDocumentWithExistingGeoreference(
      title,
      description,
      documentType,
      scale,
      nodeType,
      stakeholders,
      issuanceDate,
      language,
      pages,
      georeferenceId
    );
  }
}
export default DocumentController;
