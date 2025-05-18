import { systemLogger } from "../util/winston-logger.mjs";
import { sendErrorResponse } from "../util/response-handler.mjs";


export const errorHandler = (err, req, res, next) => {
    systemLogger.error("Unhandled error", {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
      });

      sendErrorResponse(res, err.statusCode || 500, process.env.NODE_ENV === "production" ? "Something went wrong." : err.message)
}