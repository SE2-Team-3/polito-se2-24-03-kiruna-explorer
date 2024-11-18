import express from "express";
import ErrorHandler from "./helper";
import Authenticator from "./routers/auth";
import { AuthRoutes, UserRoutes } from "./routers/userRoutes";
import DocumentRoutes from "./routers/documentRoutes";

const morgan = require("morgan");
const prefix = "/api";

function initRoutes(app: express.Application) {
  app.use(morgan("dev"));
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  const authenticator = new Authenticator(app);
  const authRoutes = new AuthRoutes(authenticator);
  const userRoutes = new UserRoutes(authenticator);
  const documentRoutes = new DocumentRoutes(authenticator);

  /**
   * Defining the routes
   */
  app.use(`${prefix}/sessions`, authRoutes.getRouter());
  app.use(`${prefix}/users`, userRoutes.getRouter());
  app.use(`${prefix}/documents`, documentRoutes.getRouter());

  ErrorHandler.registerErrorHandler(app);
}

export default initRoutes;
