import DocumentDAO from "../dao/documentDAO";

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
        return await this.documentDAO.createDocument(
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
}

export default DocumentController;
