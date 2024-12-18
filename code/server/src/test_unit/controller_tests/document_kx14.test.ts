import { test, expect, jest, describe } from "@jest/globals";
import DocumentController from "../../controllers/documentController";
import DocumentDAO from "../../dao/documentDAO";

const response_document = 
    {
        documentId: 1,
        title: "Test Title 1",
        description: "Test Description 1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design doc.",
        stakeholders: `["Municipality","Citizen"]`,
        issuanceDate: "2023-11-13",
        language: "English",
        pages: "100",
        coordinates: "[[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933]]",
    };

const response_resources = [] as any;
const response_attachments = [] as any;
const response_connections = [] as any;

const result_document = 
    {
        documentId: 1,
        title: "Test Title 1",
        description: "Test Description 1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design doc.",
        stakeholders: `["Municipality","Citizen"]`,
        issuanceDate: "2023-11-13",
        language: "English",
        pages: "100",
        coordinates: "[[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933]]",
        resources: [] as any,
        attachments: [] as any,
        linkedDocuments: [] as any,
    };

describe("Document Controller kx14", () => {

    let documentController: DocumentController;

    beforeEach(() => {
        documentController = new DocumentController();
        jest.mock("../../dao/documentDAO");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getDocumentById", () => {

        test("should resolve with the details of the document", async () => {

            jest.spyOn(DocumentDAO.prototype, "getDocumentById").mockResolvedValueOnce(response_document);
            jest.spyOn(DocumentDAO.prototype, "getResourcesByDocumentId").mockResolvedValueOnce(response_resources);
            jest.spyOn(DocumentDAO.prototype, "getAttachmentsByDocumentId").mockResolvedValueOnce(response_attachments);
            jest.spyOn(DocumentDAO.prototype, "getConnectionDetailsByDocumentId").mockResolvedValueOnce(response_connections);
            const result = await documentController.getDocumentById(1);

            expect(DocumentDAO.prototype.getDocumentById).toHaveBeenCalledTimes(1);
            expect(result).toStrictEqual(result_document);
        });

    });

});
