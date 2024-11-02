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
            body("title").isString(),
            body("description").isString(),
            body("documentType").isString(),
            body("scale").isString(),
            body("nodeType").isString(),
            body("stakeholders").isArray(),
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
    }
}

export default DocumentRoutes;