import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../../index";

import DocumentController from "../../../src/controllers/documentController";
import Authenticator from "../../../src/routers/auth";
import ErrorHandler from "../../../src/helper";
import { link } from "fs";
const baseURL = "/api";

jest.mock("../../../src/controllers/documentController");
jest.mock("../../../src/routers/auth");

describe("Document Route kx2", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/documents/link", () => {

        test("should return 201", async () => {
            const reqInput: any = {
                documentId1: 1,
                documentId2: 2,
                linkType: "direct consequence",
            };

            jest
                .spyOn(DocumentController.prototype, "linkDocuments")
                .mockResolvedValueOnce(true);

            jest
                .spyOn(Authenticator.prototype, "isLoggedIn")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            jest.mock("express-validator", () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isArray: () => ({ isString: () => ({}) }),
                })),
            }));

            jest
                .spyOn(ErrorHandler.prototype, "validateRequest")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            const response = await request(app)
                .post(baseURL + "/documents/link")
                .send(reqInput);

            expect(response.status).toBe(201);
            expect(DocumentController.prototype.linkDocuments).toHaveBeenCalledTimes(1);
        });

        test("should return 422 if a documentId is invalid", async () => {
            const reqInput: any = {
                documentId1: 1,
                documentId2: 0,
                linkType: "direct consequence"
            };

            jest
                .spyOn(DocumentController.prototype, "linkDocuments")
                .mockResolvedValueOnce(true);

            jest
                .spyOn(Authenticator.prototype, "isLoggedIn")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            jest.mock("express-validator", () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isArray: () => ({ isString: () => ({}) }),
                })),
            }));

            jest
                .spyOn(ErrorHandler.prototype, "validateRequest")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            const response = await request(app)
                .post(baseURL + "/documents/link")
                .send(reqInput);

            expect(response.status).toBe(422);
        });

        test("should return 422 if a field is missing", async () => {
            const reqInput: any = {
                documentId1: 1,
                linkType: "direct consequence"
            };

            jest
                .spyOn(DocumentController.prototype, "linkDocuments")
                .mockResolvedValueOnce(true);

            jest
                .spyOn(Authenticator.prototype, "isLoggedIn")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            jest.mock("express-validator", () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isArray: () => ({ isString: () => ({}) }),
                })),
            }));

            jest
                .spyOn(ErrorHandler.prototype, "validateRequest")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            const response = await request(app)
                .post(baseURL + "/documents/link")
                .send(reqInput);

            expect(response.status).toBe(422);
        });

        test("should return 422 if linkType is invalid", async () => {
            const reqInput: any = {
                documentId1: 1,
                documentId2: 2,
                linkType: "lorem ipsum"
            };

            jest
                .spyOn(DocumentController.prototype, "linkDocuments")
                .mockResolvedValueOnce(true);

            jest
                .spyOn(Authenticator.prototype, "isLoggedIn")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            jest.mock("express-validator", () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isArray: () => ({ isString: () => ({}) }),
                })),
            }));

            jest
                .spyOn(ErrorHandler.prototype, "validateRequest")
                .mockImplementation((req, res, next) => {
                    return next();
                });

            const response = await request(app)
                .post(baseURL + "/documents/link")
                .send(reqInput);

            expect(response.status).toBe(422);
        });

    });

});
