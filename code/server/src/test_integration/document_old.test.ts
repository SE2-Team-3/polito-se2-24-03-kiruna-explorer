import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import {
  postUser,
  postDocument,
  linkDocuments,
  postTypes,
  login,
  routePath,
} from "./testUtility";

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
  georeference: ["[67.8558,20.2253]", "[67.8558,20.2253]", "[67.8558,20.2253]"],
  georeferenceName: "test1",
};

const testDocument2 = {
  title: "Connection Test Document 2",
  description: "Description for Document 2",
  documentType: "Text",
  scale: "1:200",
  nodeType: "Design document",
  stakeholders: ["Municipality"],
  issuanceDate: "2024-02-01",
  language: "Swedish",
  pages: "20",
  georeference: ["[30.0,40.0]"],
  georeferenceName: "test2",
  areaColor: "#00FF00",
};

let plannerCookie: string;
let documentId1: number;
let documentId2: number;

describe("Document Route old integration tests", () => {
  beforeAll(async () => {
    await cleanup();
    await postUser(planner);
    plannerCookie = await login(planner);
    await postTypes();
    documentId1 = await postDocument(testDocument, plannerCookie);
    documentId2 = await postDocument(testDocument2, plannerCookie);
    await linkDocuments(
      documentId1,
      documentId2,
      "direct consequence",
      plannerCookie
    );
  });

  afterAll(async () => {
    await cleanup();
  });

  describe("PATCH /api/documents/:documentId", () => {
    test("should update georeference and return 201", async () => {
      const updatedGeoreference = ["[31.0,41.0]"];
      const response = await request(app)
        .patch(`${routePath}/documents/${documentId1}`)
        .send({ georeference: updatedGeoreference })
        .set("Cookie", plannerCookie)
        .expect(201);

      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Georeference created successfully");
      expect(response.body.data).toEqual(updatedGeoreference);
    });
  });

  describe("GET /api/connections", () => {
    test("should return 200 and the list of connections", async () => {
      const response = await request(app)
        .get(`${routePath}/documents/connections`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      const connection = response.body.find(
        (conn: any) =>
          (conn.documentId1 === documentId1 &&
            conn.documentId2 === documentId2) ||
          (conn.documentId1 === documentId2 && conn.documentId2 === documentId1)
      );
      expect(connection).toBeDefined();
      expect(connection.connection).toBe("direct consequence");
    });
  });

  describe("GET /api/georeferences", () => {
    test("should return 200 and all georeferences when no query param is provided", async () => {
      const response = await request(app)
        .get(`${routePath}/documents/georeferences`)
        .set("Cookie", plannerCookie)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(3);
    });

    test("should return 200 and only area georeferences when isArea=true", async () => {
      const response = await request(app)
        .get(`${routePath}/documents/georeferences`)
        .query({ isArea: "true" })
        .set("Cookie", plannerCookie)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].isArea).toBe(1);
    });

    test("should return 200 and only non-area georeferences when isArea=false", async () => {
      const response = await request(app)
        .get(`${routePath}/documents/georeferences`)
        .query({ isArea: "false" })
        .set("Cookie", plannerCookie)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0].isArea).toBe(0);
    });

    test("should return 422 when isArea is not a boolean", async () => {
      const response = await request(app)
        .get(`${routePath}/documents/georeferences`)
        .query({ isArea: "notBoolean" })
        .set("Cookie", plannerCookie)
        .expect(422);

      expect(response.body.error).toBeDefined();
    });
  });
});
