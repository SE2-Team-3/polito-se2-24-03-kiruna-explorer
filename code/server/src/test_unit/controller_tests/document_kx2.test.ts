import { test, expect, jest, describe } from "@jest/globals";
import DocumentController from "../../controllers/documentController";
import DocumentDAO from "../../dao/documentDAO";
import { InvalidLinkError } from "../../errors/documentError";

describe("Document Controller kx2", () => {

    let documentController: DocumentController;

    beforeEach(() => {
        documentController = new DocumentController();
        jest.mock("../../dao/documentDAO");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("linkDocuments", () => {

        test("should resolve true", async () => {
            jest.spyOn(DocumentDAO.prototype, "linkDocuments").mockResolvedValueOnce(true);
            const result = await documentController.linkDocuments(1, 2, "direct consequence");

            expect(DocumentDAO.prototype.linkDocuments).toHaveBeenCalledTimes(1);
            expect(result).toBe(true);
        });

        test("should throw InvalidLinkError", async () => {
            jest.spyOn(DocumentDAO.prototype, "linkDocuments").mockResolvedValueOnce(true);
            await expect(documentController.linkDocuments(1, 1, "direct consequence")).rejects.toThrow(InvalidLinkError);
        });
        
    });

});
