import DocumentDAO from "../../../src/dao/documentDAO";
import DocumentController from "../../../src/controllers/documentController";
import Document from "../../../src/components/document";

jest.mock("../../../src/db/db.ts");
jest.mock("../../../src/dao/documentDAO.ts");

describe("Document Controller Unit Tests", () => {
  describe("createDocument", () => {
    test("It should return new instance of document", async () => {
      const testDocument: Document = {
        documentId: 1,
        title: "doc-1",
        description: "doc-1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design document",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
        georeferenceId: null,
      };

      jest
        .spyOn(DocumentDAO.prototype, "createDocument")
        .mockResolvedValueOnce({
          documentId: testDocument.documentId,
          message: "Document created successfully",
          status: 201,
        });
      const controller = new DocumentController();

      const response = await controller.createDocument(
        testDocument.title,
        testDocument.description,
        testDocument.documentType,
        testDocument.scale,
        testDocument.nodeType,
        testDocument.stakeholders,
        testDocument.issuanceDate,
        testDocument.language,
        testDocument.pages,
        null
      );

      expect(DocumentDAO.prototype.createDocument).toHaveBeenCalledTimes(1);
      expect(DocumentDAO.prototype.createDocument).toHaveBeenCalledWith(
        testDocument.title,
        testDocument.description,
        testDocument.documentType,
        testDocument.scale,
        testDocument.nodeType,
        testDocument.stakeholders,
        testDocument.issuanceDate,
        testDocument.language,
        testDocument.pages,
        null
      );
      expect(response).toEqual({
        documentId: testDocument.documentId,
        message: "Document created successfully",
        status: 201,
      });
    });
  });
});
