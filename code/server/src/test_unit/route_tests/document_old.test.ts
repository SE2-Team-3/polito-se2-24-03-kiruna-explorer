import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../../index";

import DocumentController from "../../../src/controllers/documentController";
import Authenticator from "../../../src/routers/auth";
import ErrorHandler from "../../../src/helper";
const baseURL = "/api";

jest.mock("../../../src/controllers/documentController");
jest.mock("../../../src/routers/auth");

describe("Document Route kx2", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("PATCH /api/documents/:documentId", () => {

        test("should return 201 when georeference is successfully created", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]", "[2.2,2.2]", "[3.3,3.3]"];

            jest.spyOn(DocumentController.prototype, "georeferenceDocument").mockResolvedValueOnce(true);

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());

            const response = await request(app)
                .patch(`${baseURL}/documents/${documentId}`)
                .send({ georeference });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                status: "success",
                message: "Georeference created successfully",
                data: georeference,
            });
            expect(DocumentController.prototype.georeferenceDocument).toHaveBeenCalledWith(documentId.toString(), georeference);
        });

        test("should return 422 if documentId is invalid", async () => {
            const invalidDocumentId = -1;
            const georeference = ["[1.1,1.1]"];

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());

            const response = await request(app)
                .patch(`${baseURL}/documents/${invalidDocumentId}`)
                .send({ georeference });

            expect(response.status).toBe(422);
        });

        test("should return 503 if georeference is missing", async () => {
            const documentId = 1;

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());

            const response = await request(app)
                .patch(`${baseURL}/documents/${documentId}`)
                .send({});

            expect(response.status).toBe(503);
        });
    });

    describe("GET /api/documents/connections", () => {

        test("should return 200 and connections data when successful", async () => {
            const mockConnections = [
                { documentId1: 1, documentId2: 2, connection: "update" },
                { documentId1: 3, documentId2: 4, connection: "update" }
            ];

            jest.spyOn(DocumentController.prototype, "getConnections").mockResolvedValueOnce(mockConnections);
            
            const response = await request(app)
                .get(`${baseURL}/documents/connections`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConnections);
            expect(DocumentController.prototype.getConnections).toHaveBeenCalledTimes(1);
        });

        test("should return 503 when controller throws an error", async () => {
            const mockError = new Error("Internal Server Error");

            jest.spyOn(DocumentController.prototype, "getConnections").mockRejectedValueOnce(mockError);

            const response = await request(app)
                .get(`/api/documents/connections`)
                .send();

            expect(response.status).toBe(503);
            expect(DocumentController.prototype.getConnections).toHaveBeenCalledTimes(1);
        });

    });

    describe("GET /api/documents/georeferences", () => {

        test("should return 200 and all georeferences when isArea is undefined", async () => {
            const mockGeoreferences = [
                { georeferenceId: 1, coordinates: "[1.1,1.1]", georeferenceName: "Geo1", isArea: false, areaColor: "red" },
                { georeferenceId: 2, coordinates: "[2.2,2.2]", georeferenceName: "Geo2", isArea: true, areaColor: "blue" }
            ];

            jest.spyOn(DocumentController.prototype, "getGeoreferences").mockResolvedValueOnce(mockGeoreferences);

            const response = await request(app)
                .get(`${baseURL}/documents/georeferences`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockGeoreferences);
            expect(DocumentController.prototype.getGeoreferences).toHaveBeenCalledWith(undefined);
        });

        test("should return 200 and area georeferences when isArea=true", async () => {
            const mockGeoreferences = [
                { georeferenceId: 2, coordinates: "[2.2,2.2]", georeferenceName: "Geo2", isArea: true, areaColor: "blue" }
            ];

            jest.spyOn(DocumentController.prototype, "getGeoreferences").mockResolvedValueOnce(mockGeoreferences);

            const response = await request(app)
                .get(`${baseURL}/documents/georeferences`)
                .query({ isArea: "true" })
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockGeoreferences);
            expect(DocumentController.prototype.getGeoreferences).toHaveBeenCalledWith(true);
        });

        test("should return 200 and non-area georeferences when isArea=false", async () => {
            const mockGeoreferences = [
                { georeferenceId: 1, coordinates: "[1.1,1.1]", georeferenceName: "Geo1", isArea: false, areaColor: "red" }
            ];

            jest.spyOn(DocumentController.prototype, "getGeoreferences").mockResolvedValueOnce(mockGeoreferences);

            const response = await request(app)
                .get(`${baseURL}/documents/georeferences`)
                .query({ isArea: "false" })
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockGeoreferences);
            expect(DocumentController.prototype.getGeoreferences).toHaveBeenCalledWith(false);
        });

        test("should return 422 when isArea is not a boolean", async () => {
            const response = await request(app)
                .get(`${baseURL}/documents/georeferences`)
                .query({ isArea: "notABoolean" })
                .send();

            expect(response.status).toBe(422);
        });

        test("should return 503 when controller throws an error", async () => {
            const mockError = new Error("Internal Server Error");

            jest.spyOn(DocumentController.prototype, "getGeoreferences").mockRejectedValueOnce(mockError);

            const response = await request(app)
                .get(`${baseURL}/documents/georeferences`)
                .send();

            expect(response.status).toBe(503);
            expect(DocumentController.prototype.getGeoreferences).toHaveBeenCalledWith(undefined);
        });
    });

});
