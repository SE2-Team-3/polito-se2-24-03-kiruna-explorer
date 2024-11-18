import DocumentDAO from "../../../src/dao/documentDAO";
import DocumentController from "../../../src/controllers/documentController";
import Document from "../../../src/components/document";

jest.mock("../../../src/db/db.ts");
jest.mock("../../../src/dao/documentDAO.ts");

describe("Document Controller Unit Tests", () => {
  describe("createDocument", () => {
    // KX1
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
    // KX3
    test("It should return new instance of document even if a valid georeference is provided", async () => {
      const testDocument: any = {
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
        georeference: ["67.8558, 20.2253"],
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
        testDocument.georeference
      );

      expect(DocumentDAO.prototype.createDocument).toHaveBeenCalledTimes(2);
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
  // KX7 (Add Original Resources)
  describe("uploadResource", () => {
    it("should return a message that the all resources were uploaded successfully with resources", async () => {
      const documentId = 1;
      const testFile: any = {
        fieldname: "file",
        originalname: "test.pdf",
        encoding: "7bit",
        mimetype: "application/pdf",
        buffer: Buffer.from("test", "utf-8"),
        size: 4,
        destination: "",
        filename: "",
        path: "",
      };

      jest
        .spyOn(DocumentDAO.prototype, "uploadResource")
        .mockResolvedValueOnce({
          resources: [testFile],
          message: "All resources uploaded successfully",
          status: 201,
        });

      const controller = new DocumentController();
      const response = await controller.uploadResource(documentId, [testFile]);

      expect(DocumentDAO.prototype.uploadResource).toHaveBeenCalledTimes(1);
      expect(DocumentDAO.prototype.uploadResource).toHaveBeenCalledWith(
        documentId,
        [testFile]
      );
      expect(response).toEqual({
        resources: [testFile],
        message: "All resources uploaded successfully",
        status: 201,
      });
    });
    it("should throw an exception if the files are not included", async () => {
      const documentId = 1;

      jest
        .spyOn(DocumentDAO.prototype, "uploadResource")
        .mockResolvedValueOnce({
          resources: [],
          message: "All resources uploaded successfully",
          status: 201,
        });

      const controller = new DocumentController();
      try {
        await controller.uploadResource(documentId, []);
      } catch (error) {
        expect(error.message).toBe("No files uploaded");
      }
    });
  });

  describe("getResource", () => {
    it("should return the requested resource", async () => {
      const resourceId = 1;
      const testFile: any = {
        fieldname: "file",
        originalname: "test.pdf",
        encoding: "7bit",
        mimetype: "application/pdf",
        buffer: Buffer.from("test", "utf-8"),
        size: 4,
        destination: "",
        filename: "",
      };

      jest
        .spyOn(DocumentDAO.prototype, "getResourceById")
        .mockResolvedValueOnce(testFile);

      const controller = new DocumentController();

      const response = await controller.getResource(resourceId);

      expect(DocumentDAO.prototype.getResourceById).toHaveBeenCalledTimes(1);
      expect(DocumentDAO.prototype.getResourceById).toHaveBeenCalledWith(
        resourceId
      );
      expect(response).toEqual(testFile);
    });
  });
});
