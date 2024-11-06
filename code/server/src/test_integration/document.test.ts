import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import Document from "../../src/components/document";

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
beforeAll(async () => {
  await cleanup();

  await postUser(planner);
  plannerCookie = await login(planner);
});

afterAll(async () => {
  await cleanup();
});

describe("Product routes integration tests", () => {
  describe("POST /products", () => {
    // KX1
    test("It should return 200 if the document created successfully", async () => {
      const reqInnput: any = {
        title: "doc-1",
        description: "doc-1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design document",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
      };

      let document = await request(app)
        .post(`${routePath}/documents`)
        .set("Cookie", plannerCookie)
        .send(reqInnput)
        .expect(201);
      let mydocument = document.body;

      expect(mydocument).toBeDefined();
      expect(mydocument.documentId).toBeDefined();
      expect(mydocument.message).toBeDefined();
    });

    // kx3
    test("It should return 200 if the document created successfully", async () => {
      const reqInnput: any = {
        title: "doc-1",
        description: "doc-1",
        documentType: "Text",
        scale: "Text",
        nodeType: "Design document",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
        georeference: [[67.8558, 20.2253]],
      };

      let document = await request(app)
        .post(`${routePath}/documents`)
        .set("Cookie", plannerCookie)
        .send(reqInnput)
        .expect(201);
      let mydocument = document.body;

      expect(mydocument).toBeDefined();
      expect(mydocument.documentId).toBeDefined();
      expect(mydocument.message).toBeDefined();
    });
  });
});
