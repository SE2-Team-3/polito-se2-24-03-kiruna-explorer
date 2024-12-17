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
        null,
        null,
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
        null,
        null,
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
        testDocument.georeference,
        null,
        null
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
        null,
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

  describe("getResources", () => {
    it("should return the resources", async () => {
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
      };

      jest
        .spyOn(DocumentDAO.prototype, "getResourcesByDocumentId")
        .mockResolvedValueOnce([testFile]);

      const controller = new DocumentController();

      const response = await controller.getResources(documentId);

      expect(
        DocumentDAO.prototype.getResourcesByDocumentId
      ).toHaveBeenCalledTimes(1);
      expect(
        DocumentDAO.prototype.getResourcesByDocumentId
      ).toHaveBeenCalledWith(documentId);
      expect(response).toEqual([testFile]);
    });
  });

  // KX8 (Search documents)
  describe("getFilteredDocuments", () => {
    it("should return the searched documents", async () => {
      const filters: any = {
        title: "doc-1",
        documentType: "Text",
      };

      jest
        .spyOn(DocumentDAO.prototype, "getFilteredDocuments")
        .mockResolvedValueOnce(filters);

      const controller = new DocumentController();

      const response = await controller.getFilteredDocuments(filters);

      expect(DocumentDAO.prototype.getFilteredDocuments).toHaveBeenCalledTimes(
        1
      );
      expect(DocumentDAO.prototype.getFilteredDocuments).toHaveBeenCalledWith(
        filters
      );
    });


    describe("getStakeholders", () => {
      it("should return the stakeholders", async () => {
        const sh: any = [
          {
            stakeholderId: "1",
            stakeholderName: "SH_1",
          },
          {
            stakeholderId: "2",
            stakeholderName: "SH_2",
          },
        ];

        jest
          .spyOn(DocumentDAO.prototype, "getStakeholders")
          .mockResolvedValueOnce(sh);

        const controller = new DocumentController();

        const response = await controller.getStakeholders();

        expect(DocumentDAO.prototype.getStakeholders).toHaveBeenCalledTimes(
          1
        );
        expect(response).toEqual(sh)
      });
    });
  });

  describe("getDocumentTypes", () => {
    it("should return the document types", async () => {
      const dt: any = [
        {
          documentTypeId: "1",
          documentTypeName: "DT_1",
        },
        {
          documentTypeId: "2",
          documentTypeName: "DT_2",
        }
      ]

      jest
        .spyOn(DocumentDAO.prototype, "getDocumentTypes")
        .mockResolvedValueOnce(dt);

      const controller = new DocumentController();

      const response = await controller.getDocumentTypes();

      expect(DocumentDAO.prototype.getDocumentTypes).toHaveBeenCalledTimes(
        1
      );
      expect(response).toEqual(dt)
    });
  });

  describe("getNodeTypes", () => {
    it("should return the node types", async () => {
      const nt: any = [
        {
          nodeTypeId: "1",
          nodeTypeName: "NT_1",
        },
        {
          nodeTypeId: "2",
          nodeTypeName: "NT_2",
        }
      ]

      jest
        .spyOn(DocumentDAO.prototype, "getNodeTypes")
        .mockResolvedValueOnce(nt);

      const controller = new DocumentController();

      const response = await controller.getNodeTypes();

      expect(DocumentDAO.prototype.getNodeTypes).toHaveBeenCalledTimes(
        1
      );
      expect(response).toEqual(nt)
    });
  });

  describe("createDocumentType", () => {
    it("should return true", async () => {
      const dt: any = {
        documentTypeId: "1",
        documentTypeName: "DT_1",
      };

      jest
        .spyOn(DocumentDAO.prototype, "createDocumentType")
        .mockResolvedValueOnce(true);

      const controller = new DocumentController();

      const response = await controller.createDocumentType(dt);

      expect(DocumentDAO.prototype.getNodeTypes).toHaveBeenCalledTimes(
        1
      );
      expect(DocumentDAO.prototype.createDocumentType).toHaveBeenCalledWith(dt)
      expect(response).toEqual(true)
    });
  });

  describe("createNodeType", () => {
    it("should return true", async () => {
      const nt: any = {
        nodeTypeId: "1",
        nodeTypeName: "NT_1",
      };

      jest
        .spyOn(DocumentDAO.prototype, "createNodeType")
        .mockResolvedValueOnce(true);

      const controller = new DocumentController();

      const response = await controller.createNodeType(nt);

      expect(DocumentDAO.prototype.createNodeType).toHaveBeenCalledTimes(
        1
      );
      expect(DocumentDAO.prototype.createNodeType).toHaveBeenCalledWith(nt)
      expect(response).toEqual(true)
    });
  });

  describe("createStakeholder", () => {
    it("should return true", async () => {
      const sh: any = {
        nodeTypeId: "1",
        nodeTypeName: "SH_1",
      };

      jest
        .spyOn(DocumentDAO.prototype, "createStakeholder")
        .mockResolvedValueOnce(true);

      const controller = new DocumentController();

      const response = await controller.createStakeholder(sh);

      expect(DocumentDAO.prototype.createStakeholder).toHaveBeenCalledTimes(
        1
      );
      expect(DocumentDAO.prototype.createStakeholder).toHaveBeenCalledWith(sh)
      expect(response).toEqual(true)
    });
  });
});
