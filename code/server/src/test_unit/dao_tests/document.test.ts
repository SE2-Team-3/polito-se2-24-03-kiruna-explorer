import db from "../../../src/db/db";
import { Database } from "sqlite3";
import DocumentDAO from "../../../src/dao/documentDAO";

jest.mock("../../../src/db/db.ts");

describe("DocumentDAO unit tests", () => {
  describe("createDocument", () => {
    // KX1
    test("It should resolve new instance of document", async () => {
      const documentDAO = new DocumentDAO();

      const mockDBGetTypes = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { documentTypeId: 1 });
          return {} as Database;
        })
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { nodeTypeId: 1 });
          return {} as Database;
        });

      const mockSerialize = jest
        .spyOn(db, "serialize")
        .mockImplementationOnce((fn) => {
          fn();
        });

      const mockDBbeginTransaction = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql) => {
          return {} as Database;
        });

      const mockDBGetDoc = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, callback) => {
          callback(null, { documentId: 1 });
          return {} as Database;
        });

      const mockDBRunDoc = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBGetStakeholder = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { stakeholderId: 1 });
          return {} as Database;
        });

      const mockDBRunStakeholder = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBRunCommit = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createDocument(
        "doc-1",
        "doc-1",
        "Text",
        "Text",
        "Design document",
        ["LKAB"],
        "2024-11-06",
        "English",
        "1",
        null,
        null,
        null
      );
      expect(result.documentId).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.status).toBeDefined();
      mockDBGetTypes.mockRestore();
      mockDBbeginTransaction.mockRestore();
      mockDBGetDoc.mockRestore();
      mockDBRunDoc.mockRestore();
      mockDBGetStakeholder.mockRestore();
      mockDBRunStakeholder.mockRestore();
      mockDBRunCommit.mockRestore();
      mockSerialize.mockRestore();
    });

    // KX3
    test("It should resolve new instance of document with geo", async () => {
      const documentDAO = new DocumentDAO();

      const mockDBGetTypes = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { documentTypeId: 1 });
          return {} as Database;
        })
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { nodeTypeId: 1 });
          return {} as Database;
        });

      const mockSerialize = jest
        .spyOn(db, "serialize")
        .mockImplementationOnce((fn) => {
          fn();
        });

      const mockDBbeginTransaction = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql) => {
          return {} as Database;
        });

      const mockDBGetGeo = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, callback) => {
          callback(null, { georeferenceId: 1 });
          return {} as Database;
        });

      const mockDBRunGeo = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBGetDoc = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, callback) => {
          callback(null, { documentId: 1 });
          return {} as Database;
        });

      const mockDBRunDoc = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBGetStakeholder = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { stakeholderId: 1 });
          return {} as Database;
        });

      const mockDBRunStakeholder = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBRunCommit = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createDocument(
        "doc-1",
        "doc-1",
        "Text",
        "Text",
        "Design document",
        ["LKAB"],
        "2024-11-06",
        "English",
        "1",
        ["1.1,1.1"],
        "test",
        "test"
      );
      expect(result.documentId).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.status).toBeDefined();
      mockDBGetTypes.mockRestore();
      mockDBbeginTransaction.mockRestore();
      mockDBGetGeo.mockRestore();
      mockDBRunGeo.mockRestore();
      mockDBGetDoc.mockRestore();
      mockDBRunDoc.mockRestore();
      mockDBGetStakeholder.mockRestore();
      mockDBRunStakeholder.mockRestore();
      mockDBRunCommit.mockRestore();
      mockSerialize.mockRestore();
    });
  });

  // KX7 (Add original resource)
  describe("uploadResource", () => {
    it("should throw an exception when no files provided", async () => {
      const firstDocumentIntance = {
        documentId: 1,
      };

      const documentDAO = new DocumentDAO();

      try {
        await documentDAO.uploadResource(firstDocumentIntance.documentId, []);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe("No file uploaded");
      }
    });
  });

  describe("getResourceById", () => {
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

      const documentDAO = new DocumentDAO();

      const mockDBGet = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, testFile);
          return {} as Database;
        });

      const result = await documentDAO.getResourceById(resourceId);

      expect(result).toBeDefined();
      expect(result.fieldname).toBeDefined();
      expect(result.originalname).toBeDefined();
      expect(result.encoding).toBeDefined();
      expect(result.mimetype).toBeDefined();
      expect(result.buffer).toBeDefined();
      expect(result.size).toBeDefined();
      expect(result.destination).toBeDefined();
      expect(result.filename).toBeDefined();
      mockDBGet.mockRestore();
    });
  });

  describe("getResourcesByDocumentId", () => {
    it("should return the requested resources of a document", async () => {
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

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, [testFile]);
          return {} as Database;
        });

      const result = await documentDAO.getResourcesByDocumentId(documentId);

      expect(result).toBeDefined();
      expect(result[0].fieldname).toBeDefined();
      expect(result[0].originalname).toBeDefined();
      expect(result[0].encoding).toBeDefined();
      expect(result[0].mimetype).toBeDefined();
      expect(result[0].buffer).toBeDefined();
      expect(result[0].size).toBeDefined();
      expect(result[0].destination).toBeDefined();
      expect(result[0].filename).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  // KX8 (Search documents)
  describe("getFilteredDocuments", () => {
    it("should return the searched documents", async () => {
      const filters: any = {
        documentType: "Text",
      };
      const expectedDocuments = [
        {
          documentId: 1,
          title: "Test Title 1",
          description: "Test Description 1",
          documentTypeName: "Text",
          scale: "Text",
          nodeTypeName: "Design document",
          stakeholders: `["Municipality", "Architectural firm"]`,
          issuanceDate: "2023-11-13",
          language: "English",
          pages: "100",
          georeference: {
            georeferenceId: 101,
            coordinates: "[1.1, 2.2]",
            georeferenceName: "Test Georeference 1",
            isArea: 0,
          },
        },
        {
          documentId: 2,
          title: "Test Title 2",
          description: "Test Description 2",
          documentTypeName: "Text",
          scale: "1:500",
          nodeTypeName: "Design document",
          stakeholders: `["Municipality"]`,
          issuanceDate: "2023-11-13",
          language: "Swedish",
          pages: "1-100",
          georeference: {
            georeferenceId: 102,
            coordinates: "[1.1, 2.2]",
            georeferenceName: "Test Georeference 2",
            isArea: 0,
          },
        },
      ];

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, expectedDocuments);
          return {} as Database;
        });

      const result = await documentDAO.getFilteredDocuments(filters);

      expect(result).toBeDefined();
      expect(result[0].title).toBeDefined();
      expect(result[0].description).toBeDefined();
      expect(result[0].documentType).toBeDefined();
      expect(result[0].scale).toBeDefined();
      expect(result[0].nodeType).toBeDefined();
      expect(result[0].stakeholders).toBeDefined();
      expect(result[0].issuanceDate).toBeDefined();
      expect(result[0].language).toBeDefined();
      expect(result[0].pages).toBeDefined();
      expect(result[0].georeference).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  // KX18 (Add attachments)
  describe("uploadAttachment", () => {
    it("should throw an exception when no files provided", async () => {
      const firstDocumentIntance = {
        documentId: 1,
      };

      const documentDAO = new DocumentDAO();

      try {
        await documentDAO.uploadAttachment(firstDocumentIntance.documentId, []);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe("No file uploaded");
      }
    });
  });

  // KX13 (Unlink document)
  describe("getResourceById", () => {
    it("should return the result of unlink process", async () => {
      const testConnection = {
        documentId1: 1,
        documentId2: 2,
        linkType: "direct consequence",
      };

      const documentDAO = new DocumentDAO();

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementationOnce(function (this: any, sql, params, callback) {
          callback({ changes: 1 }, null);
          return {} as Database;
        });

      try {
        const result = await documentDAO.deleteDocumentConnection(
          testConnection.documentId1,
          testConnection.documentId2,
          testConnection.linkType
        );
        expect(result).toBeDefined();
        expect(result).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
      mockDBRun.mockRestore();
    });
  });

  describe("getStakeholders", () => {
    it("should return the stakeholders", async () => {
      const expectedStakeholders = [
        {
          stakeholderId:"1",
          stakeholderName:"SH_1"
        },
        {
          stakeholderId:"2",
          stakeholderName:"SH_2"
        },
      ];

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, callback) => {
          callback(null, expectedStakeholders);
          return {} as Database;
        });

      const result = await documentDAO.getStakeholders();

      expect(result).toBeDefined();
      expect(result).toHaveLength(2)
      expect(result[0].stakeholderId).toBeDefined();
      expect(result[0].stakeholderName).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  describe("getDocumentTypes", () => {
    it("should return the document types", async () => {
      const expectedDocumentTypes = [
        {
          documentTypeId:"1",
          documentTypeName:"DT_1"
        },
        {
          documentTypeId:"2",
          documentTypeName:"DT_2"
        },
      ];

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, callback) => {
          callback(null, expectedDocumentTypes);
          return {} as Database;
        });

      const result = await documentDAO.getDocumentTypes();

      expect(result).toBeDefined();
      expect(result).toHaveLength(2)
      expect(result[0].documentTypeId).toBeDefined();
      expect(result[0].documentTypeName).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  describe("getNodeTypes", () => {
    it("should return the node types", async () => {
      const expectedNodeTypes = [
        {
          nodeTypeId:"1",
          nodeTypeName:"NT_1"
        },
        {
          nodeTypeId:"2",
          nodeTypeName:"NT_2"
        },
      ];

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, callback) => {
          callback(null, expectedNodeTypes);
          return {} as Database;
        });

      const result = await documentDAO.getNodeTypes();

      expect(result).toBeDefined();
      expect(result).toHaveLength(2)
      expect(result[0].nodeTypeId).toBeDefined();
      expect(result[0].nodeTypeName).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  describe("createDocumentType", () => {
    test("It should resolve true", async () => {

      const dt = "DT_1"

      const documentDAO = new DocumentDAO();

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createDocumentType(dt);
      expect(result).toBeDefined();
      expect(result).toEqual(true)
      mockDBRun.mockRestore();
    });
  });

  describe("createNodeType", () => {
    test("It should resolve true", async () => {

      const nt = "NT_1"

      const documentDAO = new DocumentDAO();

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createNodeType(nt);
      expect(result).toBeDefined();
      expect(result).toEqual(true)
      mockDBRun.mockRestore();
    });
  });

  describe("createStakeholder", () => {
    test("It should resolve true", async () => {

      const sh = "SH_1"

      const documentDAO = new DocumentDAO();

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createStakeholder(sh);
      expect(result).toBeDefined();
      expect(result).toEqual(true)
      mockDBRun.mockRestore();
    });
  });
});
