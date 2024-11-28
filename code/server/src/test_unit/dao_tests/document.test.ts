import db from "../../../src/db/db";
import { Database } from "sqlite3";
import DocumentDAO from "../../../src/dao/documentDAO";

jest.mock("../../../src/db/db.ts");

describe("DocumentDAO unit tests", () => {
  describe("createDocument", () => {
    // KX1
    test("It should reolve new instance of document", async () => {
      const firstDocumentIntance = {
        documentId: 1,
      };
      const documentDAO = new DocumentDAO();

      const mockDBGet = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, firstDocumentIntance);
          return {} as Database;
        })
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { georeferenceId: 1 });
          return {} as Database;
        });

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementation((sql, params, callback) => {
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
        null
      );
      expect(result.documentId).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.status).toBeDefined();
      mockDBGet.mockRestore();
      mockDBRun.mockRestore();
    });

    // KX3
    test("It should reolve new instance of document even if a valid georeference is provided", async () => {
      const firstDocumentIntance = {
        documentId: 1,
      };
      const documentDAO = new DocumentDAO();

      const mockDBGet = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, firstDocumentIntance);
          return {} as Database;
        })
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { georeferenceId: 1 });
          return {} as Database;
        });

      const mockDBRun = jest
        .spyOn(db, "run")
        .mockImplementation((sql, params, callback) => {
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
        ["67.8558, 20.2253"]
      );

      expect(result.documentId).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.status).toBeDefined();
      mockDBGet.mockRestore();
      mockDBRun.mockRestore();
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
});
