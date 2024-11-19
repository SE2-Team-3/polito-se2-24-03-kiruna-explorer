import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";

const routePath = "/api";

describe("Document Route kx4 & kx6 integration tests", () => {

    beforeAll(async () => {
        await cleanup();
    });

    afterAll(async () => {
        await cleanup();
    });

    describe("GET /api/documents", () => {

        test("should return 200", async () => {
            const response = await request(app)
                .get(`${routePath}/documents`);

            expect(response.status).toBe(200);
        });

    });

});
