import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import db from "../../src/db/db";
import { routePath } from "./testUtility";

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

const postUser = async (userInfo: any) => {
    await request(app).post(`${routePath}/users`).send(userInfo).expect(200);
};

const postDocument = async (documentInfo: any, cookie: string) => {
    await request(app)
        .post(`${routePath}/documents`)
        .send(documentInfo)
        .set("Cookie", plannerCookie)
        .expect(201);
};

const postTypes = async () => {
    const insertDocumentTypes = `INSERT INTO DocumentType (documentTypeName) VALUES ("Text")`;
    const insertNodeTypes = `INSERT INTO NodeType (nodeTypeName) VALUES ("Design document")`;
    const insertStakeholders = `INSERT INTO Stakeholder (stakeholderName) VALUES ("LKAB")`;
    const insertStakeholders2 = `INSERT INTO Stakeholder (stakeholderName) VALUES ("Municipality")`;
    db.run(insertDocumentTypes, [], (err) => {
        if (err) console.log(err);
        db.run(insertNodeTypes, [], (err) => {
            if (err) console.log(err);
            db.run(insertStakeholders, [], (err) => {
                if (err) console.log(err);
                db.run(insertStakeholders2, [], (err) => {
                    if (err) console.log(err);
                });
            });
        });
    });
};

const login = async (userInfo: any) => {
    return new Promise<string>((resolve, reject) => {
        request(app)
            .post(`${routePath}/sessions`)
            .send(userInfo)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.header["set-cookie"][0]);
            });
    });
};

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
