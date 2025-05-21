import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import express from "express";
import { securityLogger } from "../util/winston-logger.mjs";
import { sendErrorResponse } from "../util/response-handler.mjs";
import dotenv from "dotenv";

dotenv.config();

export const appSecurity = (app) => {
  app.use(helmet());

  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:", "https://i.ibb.co"],
      },
    })
  );
  const allowedOrigin =
    process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : true;
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  securityLogger.info(`CORS policy applied. Origin: ${allowedOrigin}`);
  //

  //
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests.",
  });
  app.use(limiter);
  securityLogger.info(`Rate limiting applied. Window: 15min, Max: 100`);
  //

  //
  app.use(express.json({ limit: "1mb" }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: "1mb",
    })
  );
  securityLogger.info("Body size limit applied: 1mb");
  //

  //
  app.use((req, res, next) => {
    const allowedMethods = ["GET"];
    if (!allowedMethods.includes(req.method)) {
      sendErrorResponse(res, 405, "Method Not Allowed");
    }
    next();
  });
};
//

//
