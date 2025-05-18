import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, system, ...meta }) => {
      let metaString = Object.keys(meta).length ? JSON.stringify(meta) : "";
      return `[${timestamp}] [${level}] [${
        system || "general"
      }] ${message} ${metaString}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "src/log/app.log", level: "info" }),
  ],
  handleExceptions: true,
  handleRejections: true,
});

export const authLogger = logger.child({ system: "auth" });
export const securityLogger = logger.child({ system: "security" });
export const systemLogger = logger.child({ system: "system" });
export const dbLogger = logger.child({ system: "database" });
