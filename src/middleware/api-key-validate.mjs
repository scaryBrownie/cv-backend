import { sendErrorResponse } from "../util/response-handler.mjs";
import dotenv from "dotenv";
import { systemLogger } from "../util/winston-logger.mjs";
dotenv.config();

export const apiKeyValidate = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (apiKey && apiKey === process.env.API_KEY) {
      return next();
    }
    systemLogger.error("Unauthorized", {
      url: req.originalUrl,
    });
    sendErrorResponse(res, 401, "Unauthorized");
  } catch (error) {
    sendErrorResponse(res, 500, "Internal Server Error");
    console.log(error);
  }
};
