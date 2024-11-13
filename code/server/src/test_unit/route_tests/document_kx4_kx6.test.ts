import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../../index";

import DocumentController from "../../../src/controllers/documentController";
import Authenticator from "../../../src/routers/auth";
import ErrorHandler from "../../../src/helper";
const baseURL = "/api";

const mockRows = [
    {
        documentId: 1,
        title: "Test Title 1",
        description: "Test Description 1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design doc.",
        stakeholders: `[Municipality, Architectural firm]`,
        issuanceDate: "2023-11-13",
        language: "English",
        pages: "100",
        georeferenceId: 101
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
        georeferenceId: 151
    }
];

jest.mock("../../../src/controllers/documentController");
jest.mock("../../../src/routers/auth");

describe("Document Route kx2", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/documents", () => {

        test("should return 200", async () => {
            jest
                .spyOn(DocumentController.prototype, "getDocuments")
                .mockResolvedValueOnce(mockRows);

            const response = await request(app)
                .get(baseURL + "/documents");

            expect(response.status).toBe(200);
            expect(DocumentController.prototype.getDocuments).toHaveBeenCalledTimes(1);
        });

    });

});
