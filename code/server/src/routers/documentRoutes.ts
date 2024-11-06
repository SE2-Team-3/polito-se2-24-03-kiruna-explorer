import express, { Router } from "express";
import DocumentController from "../controllers/documentController";
import { body, param } from "express-validator";
import ErrorHandler from "../helper";
import Authenticator from "./auth";

class DocumentRoutes {
  private router: Router;
  private errorHandler: ErrorHandler;
  private controller: DocumentController;
  private authenticator: Authenticator;

  constructor(authenticator: Authenticator) {
    this.router = express.Router();
    this.errorHandler = new ErrorHandler();
    this.controller = new DocumentController();
    this.authenticator = authenticator;
    this.initRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  initRoutes() {
    this.router.post(
      "/",
      this.authenticator.isLoggedIn,
      body("title").notEmpty().isString(),
      body("description").notEmpty().isString(),
      body("documentType").notEmpty().isString(),
      body("scale").notEmpty().isString(),
      body("nodeType").notEmpty().isString(),
      body("stakeholders").notEmpty().isArray(),
      body("issuanceDate").optional().isString(),
      body("language").optional().isString(),
      body("pages").optional().isString(),
      body("georeference").optional().isArray(),
      this.errorHandler.validateRequest,
      (req: any, res: any, next: any) =>
        this.controller
          .createDocument(
            req.body.title,
            req.body.description,
            req.body.documentType,
            req.body.scale,
            req.body.nodeType,
            req.body.stakeholders,
            req.body.issuanceDate,
            req.body.language,
            req.body.pages,
            req.body.georeference
          )
          .then((data: any) => res.status(201).json(data))
          .catch((error: any) => next(error))
    );

    /**
     * Route for linking documents.
     * It requires the user to be logged in.
     * It requires the following parameters:
     * - documentId1: number. It is the first document to be connected.
     * - documentId2: number. It is the second document to be connected.
     * - linkType: string. It must be one of the four known link types.
     * It returns a 201 status code if the link is registered successfully.
     */
    this.router.post(
      "/link",
      this.authenticator.isLoggedIn,
      body("documentId1")
        .isInt()
        .custom((value) => value > 0),
      body("documentId2")
        .isInt()
        .custom((value) => value > 0),
      body("linkType")
        .isString()
        .isIn(["direct consequence", "collateral consequence", "prevision", "update"]),
      this.errorHandler.validateRequest,
      (req: any, res: any, next: any) =>
        this.controller
          .linkDocuments(req.body.documentId1, req.body.documentId2, req.body.linkType)
          .then(() =>
            res.status(201).json({
              status: "success",
              message: "Documents linked successfully",
              data: {
                documentId1: req.body.documentId1,
                documentId2: req.body.documentId2,
                linkType: req.body.linkType,
              },
            })
          )
          .catch((err) => {
            res.status(err.customCode);
            next(err);
          })
    );
  
    this.router.get("/", (req: any, res: any, next: any) => {
      this.controller
        .getDocuments()
        .then((documents) => res.status(200).json(documents))
        .catch((err) => next(err));
    });
    /*
    * This route can be used to update any field of a document in the future, just by specifying in the body the field to update and its new value.
    * For now it will by default always assume the call is made to update the georeference.
    */
    this.router.patch(
      "/:documentId",
      this.authenticator.isLoggedIn,
      param("documentId").isInt().custom((value) => value > 0),
      this.errorHandler.validateRequest,
      (req:any, res:any, next:any) => {
        this.controller.georeferenceDocument(req.params.documentId, req.body.georeference)
          .then(()=>res.status(201).json({
            "status":"success",
            "message":"Georeference created successfully",
            "data": req.body.georeference
          }))
          .catch((err)=>{
            res.status(err.customCode)
            next(err)
          })
      }
    )
  }
}

export default DocumentRoutes;
