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
  // KX1 (Add a new doc)
  describe("POST /api/documents", () => {
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

  // KX3 (georeference a doc)
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
      georeference: 123,
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

// KX7 (Add Original Resources)
describe("POST /api/documents/:documentId/upload-resource", () => {
  test("It returns 201  if the resource successfully uploaded  ", async () => {
    const documentId = 1;
    const reqInnput: any = {
      files: [],
    };

    jest
      .spyOn(DocumentController.prototype, "uploadResource")
      .mockResolvedValueOnce({ documentId, reqInnput });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/documents/" + documentId + "/upload-resource")
      .send(reqInnput);
    expect(response.status).toBe(201);
    expect(DocumentController.prototype.uploadResource).toHaveBeenCalled();
  });
  test("It returns 422  if documentId is not valid  ", async () => {
    const documentId = 0;
    const reqInnput: any = {
      files: [],
    };

    jest
      .spyOn(DocumentController.prototype, "uploadResource")
      .mockResolvedValueOnce({ documentId, reqInnput });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/documents/" + documentId + "/upload-resource")
      .send(reqInnput);
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.uploadResource).toHaveBeenCalled();
  });
  test("It returns 422  if documentId is not valid  ", async () => {
    const documentId = true;
    const reqInnput: any = {
      files: [],
    };

    jest
      .spyOn(DocumentController.prototype, "uploadResource")
      .mockResolvedValueOnce({ documentId, reqInnput });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/documents/" + documentId + "/upload-resource")
      .send(reqInnput);
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.uploadResource).toHaveBeenCalled();
  });
});

describe("POST /api/documents/resource/:resourceId", () => {
  test("It should return 200 if the resource is found", async () => {
    const resourceId = 1;

    jest
      .spyOn(DocumentController.prototype, "getResource")
      .mockResolvedValueOnce({ resourceId });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app).get(
      baseURL + "/documents/resource/" + resourceId
    );
    expect(response.status).toBe(200);
    expect(DocumentController.prototype.getResource).toHaveBeenCalled();
  });

  test("It should return 422 if the resourceId is invalid", async () => {
    const resourceId = 0;

    jest
      .spyOn(DocumentController.prototype, "getResource")
      .mockResolvedValueOnce({ resourceId });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app).get(
      baseURL + "/documents/resource/" + resourceId
    );
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.getResource).toHaveBeenCalled();
  });
});

describe("POST /api/documents/:documentId/resources", () => {
  test("It should return 200 if resources of the document found", async () => {
    const documentId = 1;

    jest
      .spyOn(DocumentController.prototype, "getResources")
      .mockResolvedValueOnce({ documentId } as any);

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app).get(
      baseURL + "/documents/" + documentId + "/resources"
    );
    expect(response.status).toBe(200);
    expect(DocumentController.prototype.getResources).toHaveBeenCalled();
  });
});

// KX8 (Search documents)
describe("GET /api/documents/filtered", () => {
  test("It should return 200 if searched document found", async () => {
    const filters = {
      title: "doc-1",
      documentType: "Text",
    };

    jest
      .spyOn(DocumentController.prototype, "getFilteredDocuments")
      .mockResolvedValueOnce({
        title: filters.title,
        documentType: filters,
      } as any);

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
        isString: () => ({ isLength: () => ({}) }),
        isArray: () => ({ isString: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app).get(
      baseURL +
        `/documents/filtered?title=${filters.title}&documentType=${filters.documentType}`
    );
    expect(response.status).toBe(200);
    expect(DocumentController.prototype.getResources).toHaveBeenCalled();
  });
});

// KX18 (Add attachments)
describe("POST /api/documents/:documentId/upload-attachment", () => {
  test("It returns 201  if the attachment successfully uploaded  ", async () => {
    const documentId = 1;
    const reqInput: any = {
      files: [],
    };

    jest
      .spyOn(DocumentController.prototype, "uploadAttachment")
      .mockResolvedValueOnce({ documentId, reqInput });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/documents/" + documentId + "/upload-attachment")
      .send(reqInput);
    expect(response.status).toBe(201);
    expect(DocumentController.prototype.uploadAttachment).toHaveBeenCalled();
  });
  test("It returns 422  if documentId is not valid  ", async () => {
    const documentId = 0;
    const reqInput: any = {
      files: [],
    };

    jest
      .spyOn(DocumentController.prototype, "uploadAttachment")
      .mockResolvedValueOnce({ documentId, reqInput });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/documents/" + documentId + "/upload-attachment")
      .send(reqInput);
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.uploadResource).toHaveBeenCalled();
  });

  test("It returns 422  if documentId is not valid  ", async () => {
    const documentId = true;
    const reqInput: any = {
      files: [],
    };

    jest
      .spyOn(DocumentController.prototype, "uploadAttachment")
      .mockResolvedValueOnce({ documentId, reqInput });

    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.mock("express-validator", () => ({
      param: jest.fn().mockImplementation(() => ({
        isInt: () => ({ toInt: () => ({}) }),
      })),
    }));
    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/documents/" + documentId + "/upload-attachment")
      .send(reqInput);
    expect(response.status).toBe(422);
    expect(DocumentController.prototype.uploadResource).toHaveBeenCalled();
  });
});

// KX13 (unlink documents)
describe("DELETE /api/documents/link", () => {
  test("It returns 200 if the connection unlinked successfully", async () => {
    const reqInput: any = {
      documentId1: 1,
      documentId2: 2,
      linkType: "direct consequence",
    };

    jest
      .spyOn(DocumentController.prototype, "deleteDocumentConnection")
      .mockResolvedValueOnce(true);

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
      .delete(baseURL + "/documents/link")
      .send(reqInput);

    expect(response.status).toBe(200);
    expect(
      DocumentController.prototype.deleteDocumentConnection
    ).toHaveBeenCalledTimes(1);
  });

  test("It returns 422 if a documentId is invalid", async () => {
    const reqInput: any = {
      documentId1: 1,
      documentId2: 0,
      linkType: "direct consequence",
    };

    jest
      .spyOn(DocumentController.prototype, "deleteDocumentConnection")
      .mockResolvedValueOnce(true);

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
      .delete(baseURL + "/documents/link")
      .send(reqInput);

    expect(response.status).toBe(422);
  });

  test("It returns 422 if a field is not provided", async () => {
    const reqInput: any = {
      documentId1: 1,
      linkType: "direct consequence",
    };

    jest
      .spyOn(DocumentController.prototype, "deleteDocumentConnection")
      .mockResolvedValueOnce(true);

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
      .delete(baseURL + "/documents/link")
      .send(reqInput);

    expect(response.status).toBe(422);
  });
});
