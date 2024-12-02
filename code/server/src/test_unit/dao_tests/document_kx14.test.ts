import { describe, test, expect, jest } from "@jest/globals";
import DocumentDAO from "../../dao/documentDAO";
import db from "../../db/db";
import { Database } from "sqlite3";

describe("Document DAO kx14", () => {

    let documentDAO: DocumentDAO;

    beforeEach(() => {
        documentDAO = new DocumentDAO();
        jest.mock("../../db/db");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getDocumentById", () => {

        test("should resolve with the document", async () => {
            const response_document =
            {
                documentId: 1,
                title: "Test Title 1",
                description: "Test Description 1",
                documentType: "Text",
                scale: "Text",
                nodeType: "Design doc.",
                stakeholders: `["Municipality","Citizen"]`,
                issuanceDate: "2023-11-13",
                language: "English",
                pages: "100",
                coordinates: "[[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933]]"
            };

            jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, response_document);
                return {} as Database;
            });

            const result = await documentDAO.getDocumentById(1);

            expect(db.get).toHaveBeenCalledTimes(1);
            expect(result).toStrictEqual(response_document);
        });

    });

    describe("getConnectionDetailsByDocumentId", () => {
        
        test("should resolve with the connections", async () => {
            const response_connections = [
                {
                    documentId: 2,
                    title: "test2",
                    connection: "update"
                },
                {
                    documentId: 2,
                    title: "test2",
                    connection: "collateral consequence"
                },
                {
                    documentId: 3,
                    title: "test3",
                    connection: "collateral consequence"
                }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, response_connections);
                return {} as Database;
            });

            const result = await documentDAO.getConnectionDetailsByDocumentId(1);

            expect(db.all).toHaveBeenCalledTimes(1);
            expect(result).toStrictEqual(response_connections);
        });

    });

    describe("getResourcesByDocumentId", () => {

        test("should resolve with the resources", async () => {
            const response_resources = [
                {
                    resourceId: 1,
                    fileType: "application/pdf",
                    fileName: "test.pdf",
                    data: { type: "Buffer", data: [1, 2, 3, 4] }
                },
                {
                    resourceId: 2,
                    fileType: "application/pdf",
                    fileName: "test2.pdf",
                    data: { type: "Buffer", data: [1, 2, 3, 4] }
                }
            ];

            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, response_resources);
                return {} as Database;
            });

            const result = await documentDAO.getResourcesByDocumentId(1);

            expect(db.all).toHaveBeenCalledTimes(1);
            expect(result).toStrictEqual(response_resources);
        });

    });

});