import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import db from "../../src/db/db";

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

const postResource = async () => {
  const insertResource = `INSERT INTO Resource (resourceId, data) VALUES (1, "test content")`;
  const insertDcocumentResources = `INSERT INTO DocumentResources (documentId, resourceId, fileType, fileName) VALUES (1, 1, "text/plain", "test.txt")`;
  db.run(insertResource, [], (err) => {
    if (err) console.log(err);
    db.run(insertDcocumentResources, [], (err) => {
      if (err) console.log(err);
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
beforeAll(async () => {
  await cleanup();

  await postUser(planner);
  plannerCookie = await login(planner);

  await postResource();
  await postDocument(testDocument, plannerCookie);
});

afterAll(async () => {
  await cleanup();
});

describe("Document routes integration tests", () => {
  describe("POST /api/documents", () => {
    // KX1
    test("It should return 201 if the document created successfully", async () => {
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
    test("It should return 201 while georeference provided if the document created successfully", async () => {
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

  // KX7 (Add original resource)
  describe("POST /api/documents/:documentId/upload-resource", () => {
    test("It should return 201 if all resources uploaded successfully", async () => {
      const documnetId = 1;
      const files: Express.Multer.File[] = [
        {
          fieldname: "file",
          originalname: "test1.txt",
          encoding: "7bit",
          mimetype: "text/plain",
          buffer: Buffer.from("test content 1"),
          size: 16,
          destination: "",
          filename: "",
          path: "",
          stream: null,
        },
        {
          fieldname: "file",
          originalname: "test2.txt",
          encoding: "7bit",
          mimetype: "text/plain",
          buffer: Buffer.from("test content 2"),
          size: 24,
          destination: "",
          filename: "",
          path: "",
          stream: null,
        },
      ];

      let response = await request(app)
        .post(`${routePath}/documents/${documnetId}/upload-resource`)
        .set("Cookie", plannerCookie)
        .attach("files", files[0].buffer, files[0].originalname)
        .attach("files", files[1].buffer, files[1].originalname)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.status).toBeDefined();
      expect(response.body.resources).toBeDefined();
      expect(response.body.message).toBeDefined();
    });
  });

  describe("POST /api/documents/resource/:resourceId", () => {
    test("It should return 200 with the requested resource", async () => {
      const resourceId = 1;
      let response = await request(app)
        .get(`${routePath}/documents/resource/${resourceId}`)
        .set("Cookie", plannerCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.fileName).toBeDefined();
      expect(response.body.fileType).toBeDefined();
      expect(response.body.data).toBeDefined();
    });
  });

  describe("POST /api/documents/documentId/resources", () => {
    test("It should return 200 with the requested resources of a document", async () => {
      const documentId = 1;
      let response = await request(app)
        .get(`${routePath}/documents/${documentId}/resources`)
        .set("Cookie", plannerCookie)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
