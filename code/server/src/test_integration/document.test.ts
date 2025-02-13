import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import db from "../../src/db/db";
import {
  postUser,
  postDocument,
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
  georeference: [[67.8558, 20.2253]],
  georeferenceName: "test",
};

let plannerCookie: string;

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

const postDocumentConnection = async () => {
  const insertDocumentConnection = `INSERT INTO DocumentConnections (documentId1, documentId2, linkType) VALUES (1, 2, "direct consequence")`;
  db.run(insertDocumentConnection, [], (err) => {
    if (err) console.log(err);
  });
};

beforeAll(async () => {
  await cleanup();

  await postUser(planner);
  plannerCookie = await login(planner);

  await postTypes();
  await postResource();

  await postDocument(testDocument, plannerCookie);
  await postDocumentConnection();
});

afterAll(async () => {
  // await cleanup();
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

  // KX8 (Search documents)
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
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /api/documents/filtered", () => {
    test("It should return 200 with the searched documents", async () => {
      const filters = {
        title: "document-1",
        documentType: "Text",
        stakeholders: "Municipality",
        issuanceDateStart: "2014-3",
        issuanceDateEnd: "2015-01-07",
      };

      let response = await request(app)
        .get(
          `${routePath}/documents/filtered?title=${filters.title}&documentType=${filters.documentType}&stakeholders=${filters.stakeholders}`
        )
        .set("Cookie", plannerCookie)
        .expect(200);

      expect(response.body.length).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  // KX7 (Add attachments)
  describe("POST /api/documents/:documentId/upload-attachment", () => {
    test("It should return 201 if all attachments uploaded successfully", async () => {
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
        .post(`${routePath}/documents/${documnetId}/upload-attachment`)
        .set("Cookie", plannerCookie)
        .attach("files", files[0].buffer, files[0].originalname)
        .attach("files", files[1].buffer, files[1].originalname)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.status).toBeDefined();
      expect(response.body.attachments).toBeDefined();
      expect(response.body.message).toBeDefined();
    });
  });

  // kx13 (Unlink document)
  test("It should return 404 if the link not found", async () => {
    const testConnection = {
      documentId1: 11,
      documentId2: 12,
      linkType: "direct consequence",
    };

    let result = await request(app)
      .delete(`${routePath}/documents/link`)
      .set("Cookie", plannerCookie)
      .send(testConnection)
      .expect(404);

    expect(result.body).toBeDefined();
    expect(result.body.message).toBe("Document connection not found");
  });
});
