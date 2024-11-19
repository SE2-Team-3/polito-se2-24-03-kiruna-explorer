import { describe, test, expect, jest } from "@jest/globals";
import DocumentDAO from "../../dao/documentDAO";
import db from "../../db/db";
import { Database } from "sqlite3";

const mockRows = [
    {
        documentId: 1,
        title: "Test Title 1",
        description: "Test Description 1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design doc.",
        stakeholders: `["Municipality", "Architectural firm"]`,
        issuanceDate: "2023-11-13",
        language: "English",
        pages: "100",
        georeferenceId: 101,
        coordinates: "[1.1, 2.2]"
    },
    {
        documentId: 2,
        title: "Test Title 2",
        description: "Test Description 2",
        documentType: "Architectural plan",
        scale: "1:500",
        nodeType: "Design doc.",
        stakeholders: `["Municipality"]`,
        issuanceDate: "2023-11-13",
        language: "Swedish",
        pages: "1-100",
        georeferenceId: 151,
        coordinates: "[1.1, 2.2]"
    }
];

describe("Document DAO kx4 & kx6", () => {

    let documentDAO: DocumentDAO;

    beforeEach(() => {
        documentDAO = new DocumentDAO();
        jest.mock("../../db/db");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getDocuments", () => {

        test("should resolve with list of documents", async () => {
            jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(null, mockRows);
                return {} as Database;
            });
            
            const result = await documentDAO.getDocuments();

            expect(db.all).toHaveBeenCalledTimes(1);
            expect(result).toBe(mockRows);
        });

    });

});
