import { describe, test, expect, jest } from "@jest/globals";
import DocumentDAO from "../../dao/documentDAO";
import db from "../../db/db";
import { Database } from "sqlite3";
import { mock } from "node:test";

const mockRows = [
    {
        documentId: 1,
        title: "Test Title 1",
        description: "Test Description 1",
        documentTypeName: "Text",
        scale: "Text",
        nodeTypeName: "Design document",
        stakeholders: `["Municipality","Architectural firm"]`,
        issuanceDate: "2023-11-13",
        language: "English",
        pages: "100",
        georeferenceId: 101,
        coordinates: "[1.1,2.2]"
    },
    {
        documentId: 2,
        title: "Test Title 2",
        description: "Test Description 2",
        documentTypeName: "Architectural plan",
        scale: "1:500",
        nodeTypeName: "Design document",
        stakeholders: `["Municipality"]`,
        issuanceDate: "2023-11-13",
        language: "Swedish",
        pages: "1-100",
        georeferenceId: 151,
        coordinates: "[1.1,2.2]"
    }
];

const mockResponse = [
    {
        documentId: mockRows[0].documentId,
        title: mockRows[0].title,
        description: mockRows[0].description,
        documentType: mockRows[0].documentTypeName,
        scale: mockRows[0].scale,
        nodeType: mockRows[0].nodeTypeName,
        stakeholders: mockRows[0].stakeholders,
        issuanceDate: mockRows[0].issuanceDate,
        language: mockRows[0].language,
        pages: mockRows[0].pages,
        georeferenceId: mockRows[0].georeferenceId,
        coordinates: mockRows[0].coordinates
    },
    {
        documentId: mockRows[1].documentId,
        title: mockRows[1].title,
        description: mockRows[1].description,
        documentType: mockRows[1].documentTypeName,
        scale: mockRows[1].scale,
        nodeType: mockRows[1].nodeTypeName,
        stakeholders: mockRows[1].stakeholders,
        issuanceDate: mockRows[1].issuanceDate,
        language: mockRows[1].language,
        pages: mockRows[1].pages,
        georeferenceId: mockRows[1].georeferenceId,
        coordinates: mockRows[1].coordinates
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
            jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, mockRows);
                return {} as Database;
            });

            const result = await documentDAO.getDocuments();

            expect(db.all).toHaveBeenCalledTimes(1);
            result.forEach((doc, index) => {
                expect(doc.documentId).toBe(mockResponse[index].documentId);
                expect(doc.title).toBe(mockResponse[index].title);
                expect(doc.description).toBe(mockResponse[index].description);
                expect(doc.documentType).toBe(mockResponse[index].documentType);
                expect(doc.scale).toBe(mockResponse[index].scale);
                expect(doc.nodeType).toBe(mockResponse[index].nodeType);
                expect(doc.stakeholders.replace(/[^a-zA-Z]/g, "")).toBe(mockResponse[index].stakeholders.replace(/[^a-zA-Z]/g, ""));
                expect(doc.issuanceDate).toBe(mockResponse[index].issuanceDate);
                expect(doc.language).toBe(mockResponse[index].language);
                expect(doc.pages).toBe(mockResponse[index].pages);
                expect(doc.georeferenceId).toBe(mockResponse[index].georeferenceId);
                expect(doc.coordinates).toBe(mockResponse[index].coordinates);
            });
        });

    });

});
