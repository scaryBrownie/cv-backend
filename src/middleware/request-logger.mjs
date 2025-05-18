import { systemLogger } from "../util/winston-logger.mjs";

const requestLogger = (req, res, next) => {
  systemLogger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  next();
};

export default requestLogger;
