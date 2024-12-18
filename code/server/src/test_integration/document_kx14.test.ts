import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import { routePath } from "./testUtility";

describe("Document Route kx14 integration tests", () => {

    beforeAll(async () => {
        await cleanup();
    });

    afterAll(async () => {
        await cleanup();
    });

    describe("GET /api/documents/:documentId", () => {

        test("should return 200", async () => {
            const response = await request(app)
                .get(`${routePath}/documents/1`);

            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual({});
        });

    });

});
