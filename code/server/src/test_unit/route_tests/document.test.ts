import { describe, test, expect, jest } from "@jest/globals";
import request from "supertest";
import { app } from "../../../index";

import DocumentController from "../../../src/controllers/documentController";
import Authenticator from "../../../src/routers/auth";
import ErrorHandler from "../../../src/helper";
const baseURL = "/api";

jest.mock("../../../src/controllers/documentController");
jest.mock("../../../src/routers/auth");

describe("DocumentRoute unit tests", () => {
  describe("GET /api/documents", () => {
    // KX1
    test("It returns 201 is new instance of document created successfully", async () => {
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

      jest
        .spyOn(DocumentController.prototype, "createDocument")
        .mockResolvedValueOnce(reqInnput);

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
        .post(baseURL + "/documents")
        .send(reqInnput);
      expect(response.status).toBe(201);
      expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
    });

    test("It returns 422 is description field is not valid", async () => {
      const reqInnput: any = {
        title: "doc-1",
        description: 1234,
        documentType: "Text",
        scale: "Text",
        nodeType: "Design document",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
      };

      jest
        .spyOn(DocumentController.prototype, "createDocument")
        .mockResolvedValueOnce(reqInnput);

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
        .post(baseURL + "/documents")
        .send(reqInnput);
      expect(response.status).toBe(422);
      expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
    });

    test("It returns 422 is documentType field is not valid", async () => {
      const reqInnput: any = {
        title: "doc-1",
        description: "doc-1",
        documentType: 1234,
        scale: "Text",
        nodeType: "Design document",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
      };

      jest
        .spyOn(DocumentController.prototype, "createDocument")
        .mockResolvedValueOnce(reqInnput);

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
        .post(baseURL + "/documents")
        .send(reqInnput);
      expect(response.status).toBe(422);
      expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
    });

    test("It returns 422 is scale field is not valid", async () => {
      const reqInnput: any = {
        title: "doc-1",
        description: "doc-1",
        documentType: "Text",
        scale: "",
        nodeType: "Design document",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
      };

      jest
        .spyOn(DocumentController.prototype, "createDocument")
        .mockResolvedValueOnce(reqInnput);

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
        .post(baseURL + "/documents")
        .send(reqInnput);
      expect(response.status).toBe(422);
      expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
    });

    test("It returns 422 is nodeType field is not valid", async () => {
      const reqInnput: any = {
        title: "doc-1",
        description: "doc-1",
        documentType: "Text",
        scale: "Text",
        nodeType: "",
        stakeholders: ["LKAB"],
        issuanceDate: "2024-11-06",
        language: "English",
        pages: "1",
      };

      jest
        .spyOn(DocumentController.prototype, "createDocument")
        .mockResolvedValueOnce(reqInnput);

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
        .post(baseURL + "/documents")
        .send(reqInnput);
      expect(response.status).toBe(422);
      expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
    });
  });

  test("It returns 422 is stakeholders field is not valid", async () => {
    const reqInnput: any = {
      title: "doc-1",
      description: "doc-1",
      documentType: "Text",
      scale: "Text",
      nodeType: "Design document",
      stakeholders: "",
      issuanceDate: "2024-11-06",
      language: "English",
      pages: "1",
    };

    jest
      .spyOn(DocumentController.prototype, "createDocument")
      .mockResolvedValueOnce(reqInnput);

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
      .post(baseURL + "/documents")
      .send(reqInnput);
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
  });

  // KX3
  test("It returns 201 if we consider the georeference in our input with a new instance of  successfully created document  ", async () => {
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

    jest
      .spyOn(DocumentController.prototype, "createDocument")
      .mockResolvedValueOnce(reqInnput);

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
      .post(baseURL + "/documents")
      .send(reqInnput);
    expect(response.status).toBe(201);
    expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
  });

  test("It returns 201 if we consider the georeference in our input with a new instance of successfully created document  ", async () => {
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
      georeference: [[]],
    };

    jest
      .spyOn(DocumentController.prototype, "createDocument")
      .mockResolvedValueOnce(reqInnput);

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
      .post(baseURL + "/documents")
      .send(reqInnput);
    expect(response.status).toBe(201);
    expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
  });

  test("It returns 422 if we consider the invalid georeference in our input", async () => {
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
      georeference: null,
    };

    jest
      .spyOn(DocumentController.prototype, "createDocument")
      .mockResolvedValueOnce(reqInnput);

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
      .post(baseURL + "/documents")
      .send(reqInnput);
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.createDocument).toHaveBeenCalled();
  });

});
