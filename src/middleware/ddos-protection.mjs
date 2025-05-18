import rateLimit from "express-rate-limit";
import { exec } from "child_process";
import { promisify } from "util";
import { securityLogger } from "../util/winston-logger.mjs";

const execAsync = promisify(exec);

const ddosLimiter = rateLimit({
  windowMs: 1000,
  max: 20,
  message: "something went wrong",
  handler: async (req, res, next) => {
    const ip = req.ip;
    try {
      await banIP(ip);
      securityLogger.info("[DDOS]IP ${ip} has banned");
      res.status(429).json({ error: "something went wrong" });
    } catch (error) {
      securityLogger.error("ban fail ${ip}: ${error.message}");
      res.status(429).json({ error: "something went wrong" });
    }
  },
});

async function banIP(ip) {
  try {
    await execAsync("sudo ufw insert 1 deny from ${ip} to any");
    securityLogger.info(`[BANNED]: ${ip}`);
  } catch (error) {
    securityLogger.error("ban error ${ip}: ${error.message}");
    throw error;
  }
}

async function unbanIP(ip) {
  try {
    await execAsync("sudo ufw delete deny from ${ip} to any");
    securityLogger.info("[UNBANNED]: ${ip}");
  } catch (error) {
    securityLogger.error("unban error ${ip}: ${error.message}");
    throw error;
  }
}

export { ddosLimiter, banIP, unbanIP };
