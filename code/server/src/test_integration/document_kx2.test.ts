import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";

const routePath = "/api";

const planner = {
    username: "planner",
    name: "planner",
    surname: "planner",
    password: "planner",
    birthdate: "2000-01-01",
    address: "address",
    role: "UrbanPlanner",
};

let plannerCookie: string;

const postUser = async (userInfo: any) => {
    await request(app).post(`${routePath}/users`).send(userInfo).expect(200);
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
    });

    afterAll(async () => {
        await cleanup();
    });

    describe("POST /api/documents/link", () => {

        test("should return 201", async () => {
            const reqInput: any = {
                documentId1: 1,
                documentId2: 2,
                linkType: "direct consequence",
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
