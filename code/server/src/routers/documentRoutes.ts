import express, { Router } from "express"
import ErrorHandler from "../helper"
import { body, param, query } from "express-validator"
import DocumentController from "../controllers/documentController"
import Authenticator from "./auth"


class DocumentRoutes {
    private controller: DocumentController
    private router: Router
    private errorHandler: ErrorHandler
    private authenticator: Authenticator

    /**
     * Constructs a new instance of the DocumentRoutes class.
     * @param {Authenticator} authenticator - The authenticator object used for authentication.
     */
    constructor(authenticator: Authenticator) {
        this.authenticator = authenticator
        this.controller = new DocumentController()
        this.router = express.Router()
        this.errorHandler = new ErrorHandler()
        this.initRoutes()
    }

    /**
     * Returns the router instance.
     * @returns The router instance.
     */
    getRouter(): Router {
        return this.router
    }

    /**
     * Initializes the routes for the document router.
     * 
     * @remarks
     * This method sets up the HTTP routes for handling document-related operations.
     * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.
     * 
     */
    initRoutes() {

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
            "/documents-connections",
            this.authenticator.isLoggedIn,
            body("documentId1").isInt().custom(value => value > 0),
            body("documentId2").isInt().custom(value => value > 0),
            body("linkType").isString().isIn(["direct consequence","collateral consqeuence","prevision","update"]),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => this.controller.linkDocuments(req.body.documentId1,req.body.documentId2,req.body.linkType)
                .then(() => res.status(201).json({
                    status:"success",
                    message:"Documents linked successfully",
                    data:{
                        documentId1:req.body.documentId1,
                        documentId2:req.body.documentId2,
                        linkType:req.body.linkType
                    }
                }))
                .catch((err) => {
                    res.status(err.customCode)
                    next(err)
                })
        )
    }
}