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
    georeference: string[] | null
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
      georeference
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
}
export default DocumentController;
