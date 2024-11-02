import DocumentDAO from "../dao/documentDAO";

/**
 * Represents a controller for managing documents.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class DocumentController {
  private dao: DocumentDAO;

  constructor() {
    this.dao = new DocumentDAO();
  }

  async linkDocuments(documentId1:number,documentId2:number,linkType:string): Promise<boolean> {
    return this.dao.linkDocuments(documentId1,documentId2,linkType)
  }
}

export default DocumentController;
