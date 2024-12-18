import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import db from "../../src/db/db";
import { postUser, postDocument, postTypes, login, routePath } from "./testUtility";

const planner = {
    username: "planner",
    name: "planner",
    surname: "planner",
    password: "planner",
    birthdate: "2000-01-01",
    address: "address",
    role: "UrbanPlanner",
};

const testDocument = {
    title: "doc-test",
    description: "doc-test",
    documentType: "Text",
    scale: "Text",
    nodeType: "Design document",
    stakeholders: ["LKAB"],
    issuanceDate: "2024-11-06",
    language: "English",
    pages: "1",
    georeference: [[67.8558, 20.2253]],
    georeferenceName: "test",
};

const testDocument2 = {
    title: "doc-test2",
    description: "doc-test2",
    documentType: "Text",
    scale: "Text",
    nodeType: "Design document",
    stakeholders: ["LKAB"],
    issuanceDate: "2024-11-06",
    language: "English",
    pages: "1",
    georeference: [[67.8558, 20.2253]],
    georeferenceName: "test",
};

let plannerCookie: string;

describe("Document Route kx2 integration tests", () => {

    beforeAll(async () => {
        await cleanup();
        await postUser(planner);
        plannerCookie = await login(planner);
        await postTypes();
        await postDocument(testDocument, plannerCookie);
        await postDocument(testDocument2, plannerCookie);
    });

    afterAll(async () => {
        await cleanup();
    });

    describe("POST /api/documents/link", () => {

        test("should return 201", async () => {
            const reqInput: any = {
                documentId1: 1,
                documentId2: 2,
                linkType: "update",
            };

            const response = await request(app)
                .post(`${routePath}/documents/link`)
                .set("Cookie", plannerCookie)
                .send(reqInput)
                .set("Cookie", plannerCookie);

            expect(response.status).toBe(201);
        });

    });

});
