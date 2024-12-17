import { describe, test, expect, jest } from "@jest/globals";
import DocumentDAO from "../../dao/documentDAO";
import db from "../../db/db";
import { Database } from "sqlite3";

describe("Document DAO old", () => {

    let documentDAO: DocumentDAO;

    beforeEach(() => {
        documentDAO = new DocumentDAO();
        jest.mock("../../db/db");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("georeferenceDocument", () => {

        test("should successfully georeference a document", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]", "[2.2,2.2]", "[3.3,3.3]"];
            const mockGeoreferenceId = 1;

            jest.spyOn(db, "get").mockImplementation((sql, callback) => {
                callback(null, { georeferenceId: mockGeoreferenceId });
                return {} as Database;
            });

            jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const result = await documentDAO.georeferenceDocument(documentId, georeference);

            expect(db.get).toHaveBeenCalledWith(
                "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference",
                expect.any(Function)
            );
            expect(db.run).toHaveBeenCalledTimes(2);
            expect(result).toBe(true);
        });

        test("should handle database get error", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]", "[2.2,2.2]", "[3.3,3.3]"];
            const mockError = new Error("DB get error");

            jest.spyOn(db, "get").mockImplementation((sql, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            await expect(documentDAO.georeferenceDocument(documentId, georeference))
                .rejects
                .toThrow("DB get error");

            expect(db.get).toHaveBeenCalledWith(
                "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference",
                expect.any(Function)
            );
            expect(db.run).not.toHaveBeenCalled();
        });

        test("should handle database run error during createGeoreference", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]", "[2.2,2.2]", "[3.3,3.3]"];
            const mockGeoreferenceId = 1;
            const mockError = new Error("DB run error");

            jest.spyOn(db, "get").mockImplementation((sql, callback) => {
                callback(null, { georeferenceId: mockGeoreferenceId });
                return {} as Database;
            });

            jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(documentDAO.georeferenceDocument(documentId, georeference))
                .rejects
                .toThrow("DB run error");

            expect(db.get).toHaveBeenCalledWith(
                "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference",
                expect.any(Function)
            );
            expect(db.run).toHaveBeenCalledTimes(1);
        });

        test("should handle database run error during updateDocument", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]", "[2.2,2.2]", "[3.3,3.3]"];
            const mockGeoreferenceId = 1;
            const mockError = new Error("DB update error");

            jest.spyOn(db, "get").mockImplementation((sql, callback) => {
                callback(null, { georeferenceId: mockGeoreferenceId });
                return {} as Database;
            });

            jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
                callback(null);
                return {} as Database;
            }).mockImplementationOnce((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(documentDAO.georeferenceDocument(documentId, georeference))
                .rejects
                .toThrow("DB update error");

            expect(db.get).toHaveBeenCalledWith(
                "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference",
                expect.any(Function)
            );
            expect(db.run).toHaveBeenCalledTimes(2);
        });
    });

    describe("getConnections", () => {

        test("should resolve with list of connections", async () => {
            const mockRows = [
                { documentId1: 1, documentId2: 2, connection: "update" },
                { documentId1: 3, documentId2: 4, connection: "direct consequence" }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(null, mockRows);
                return {} as Database;
            });

            const result = await documentDAO.getConnections();

            expect(db.all).toHaveBeenCalledWith(
                "SELECT documentId1, documentId2, connection FROM DocumentConnections",
                expect.any(Function)
            );
            expect(result).toEqual(mockRows);
        });

        test("should handle database error", async () => {
            const mockError = new Error("DB error");

            jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            await expect(documentDAO.getConnections()).rejects.toThrow("DB error");

            expect(db.all).toHaveBeenCalledWith(
                "SELECT documentId1, documentId2, connection FROM DocumentConnections",
                expect.any(Function)
            );
        });
    });

    describe("getConnectionsById", () => {

        test("should resolve with connections for the given documentId", async () => {
            const documentId = 1;
            const mockRows = [
                { documentId1: 1, documentId2: 2, connection: "update" },
                { documentId1: 1, documentId2: 3, connection: "update" }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, mockRows);
                return {} as Database;
            });

            const result = await documentDAO.getConnectionsById(documentId);

            expect(result).toEqual(mockRows);
        });

        test("should handle database error", async () => {
            const documentId = 1;
            const mockError = new Error("DB error");

            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            await expect(documentDAO.getConnectionsById(documentId)).rejects.toThrow("DB error");
        });
    });

    describe("getGeoreferences", () => {

        test("should resolve with all georeferences when isArea is undefined", async () => {
            const mockRows = [
                { georeferenceId: 1, coordinates: "[1.1,1.1]", georeferenceName: "geo1", isArea: 1, areaColor: "red" },
                { georeferenceId: 2, coordinates: "[2.2,2.2]", georeferenceName: "geo2", isArea: 0, areaColor: "blue" }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(null, mockRows);
                return {} as Database;
            });

            const result = await documentDAO.getGeoreferences();

            expect(db.all).toHaveBeenCalledWith(
                "SELECT georeferenceId, coordinates, georeferenceName, isArea, areaColor FROM Georeference",
                expect.any(Function)
            );
            expect(result).toEqual(mockRows);
        });

        test("should resolve with area georeferences when isArea is true", async () => {
            const mockRows = [
                { georeferenceId: 1, coordinates: "[1.1,1.1]", georeferenceName: "geo1", isArea: 1, areaColor: "red" }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                expect(params).toEqual([1]);
                callback(null, mockRows);
                return {} as Database;
            });

            const result = await documentDAO.getGeoreferences(true);

            expect(db.all).toHaveBeenCalledWith(
                "SELECT georeferenceId, coordinates, georeferenceName, isArea, areaColor FROM Georeference WHERE isArea = ?",
                [1],
                expect.any(Function)
            );
            expect(result).toEqual(mockRows);
        });

        test("should resolve with non-area georeferences when isArea is false", async () => {
            const mockRows = [
                { georeferenceId: 2, coordinates: "[2.2,2.2]", georeferenceName: "geo2", isArea: 0, areaColor: "blue" }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                expect(params).toEqual([0]);
                callback(null, mockRows);
                return {} as Database;
            });

            const result = await documentDAO.getGeoreferences(false);

            expect(db.all).toHaveBeenCalledWith(
                "SELECT georeferenceId, coordinates, georeferenceName, isArea, areaColor FROM Georeference WHERE isArea = ?",
                [0],
                expect.any(Function)
            );
            expect(result).toEqual(mockRows);
        });

        test("should handle database error", async () => {
            const mockError = new Error("DB error");

            jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            await expect(documentDAO.getGeoreferences()).rejects.toThrow("DB error");

            expect(db.all).toHaveBeenCalledWith(
                "SELECT georeferenceId, coordinates, georeferenceName, isArea, areaColor FROM Georeference",
                expect.any(Function)
            );
        });
    });

    describe("updateGeoreferenceId", () => {

        test("should successfully update georeferenceId", async () => {
            jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const result = await documentDAO.updateGeoreferenceId(1, 2);

            expect(db.run).toHaveBeenCalledWith(
                "UPDATE Document SET georeferenceId = ? WHERE documentId = ?",
                [2, 1],
                expect.any(Function)
            );
            expect(result).toBe(true);
        });

        test("should handle database error", async () => {
            const mockError = new Error("DB run error");

            jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(documentDAO.updateGeoreferenceId(1, 2)).rejects.toThrow("DB run error");

            expect(db.run).toHaveBeenCalledWith(
                "UPDATE Document SET georeferenceId = ? WHERE documentId = ?",
                [2, 1],
                expect.any(Function)
            );
        });
    });

});
