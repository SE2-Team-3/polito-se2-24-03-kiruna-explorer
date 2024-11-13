import { test, expect, jest, describe } from "@jest/globals";
import DocumentController from "../../controllers/documentController";
import DocumentDAO from "../../dao/documentDAO";
import Document from "../../components/document";

const documents: Document[] = [
    new Document(
        1,
        "Titolo Documento 1",
        "Descrizione del documento 1",
        "Tipo 1",
        "Scala 1:1000",
        "Nodo 1",
        ["Stakeholder 1", "Stakeholder 2"],
        "2023-11-13",
        "IT",
        "100",
        101
    ),
    new Document(
        2,
        "Titolo Documento 2",
        "Descrizione del documento 2",
        "Tipo 2",
        "Scala 1:500",
        "Nodo 2",
        ["Stakeholder 3"],
        null,
        "EN",
        "50",
        null
    )
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
