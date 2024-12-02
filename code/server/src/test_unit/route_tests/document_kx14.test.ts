import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../../index";

import DocumentController from "../../../src/controllers/documentController";
const baseURL = "/api";

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
        coordinates: "[[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933],[67.8600199224865,20.209608078002933]]",
        resources: [] as any[],
        linkedDocuments: []  as any[]
    };

jest.mock("../../../src/controllers/documentController");

describe("Document Route kx14", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/documents/:documentId", () => {

        test("should return 200", async () => {
            jest
                .spyOn(DocumentController.prototype, "getDocumentById")
                .mockResolvedValueOnce(response_document);

            const response = await request(app)
                .get(baseURL + "/documents/1");

            expect(response.status).toBe(200);
            expect(DocumentController.prototype.getDocumentById).toHaveBeenCalledTimes(1);
        });

    });

});
