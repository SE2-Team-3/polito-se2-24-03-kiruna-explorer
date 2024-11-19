import { test, expect, jest, describe } from "@jest/globals";
import DocumentController from "../../controllers/documentController";
import DocumentDAO from "../../dao/documentDAO";

const documents = [
    {
        documentId: 1,
        title: "Test Title 1",
        description: "Test Description 1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design doc.",
        stakeholders: `["Municipality", "Architectural firm"]`,
        issuanceDate: "2023-11-13",
        language: "English",
        pages: "100",
        georeferenceId: 101,
        coordinates: "[1.1, 2.2]"
    },
    {
        documentId: 2,
        title: "Test Title 2",
        description: "Test Description 2",
        documentType: "Architectural plan",
        scale: "1:500",
        nodeType: "Design doc.",
        stakeholders: `["Municipality"]`,
        issuanceDate: "2023-11-13",
        language: "Swedish",
        pages: "1-100",
        georeferenceId: 151,
        coordinates: "[1.1, 2.2]"
    }
];

describe("Document Controller kx4 & kx6", () => {

    let documentController: DocumentController;

    beforeEach(() => {
        documentController = new DocumentController();
        jest.mock("../../dao/documentDAO");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getDocuments", () => {

        test("should resolve with the list of documents", async () => {
            jest.spyOn(DocumentDAO.prototype, "getDocuments").mockResolvedValueOnce(documents);
            const result = await documentController.getDocuments();

            expect(DocumentDAO.prototype.getDocuments).toHaveBeenCalledTimes(1);
            expect(result).toBe(documents);
        });

    });

});
