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
});
