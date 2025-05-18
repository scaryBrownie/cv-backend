import { createClient } from "redis";
import dotenv from "dotenv";
import { dbLogger } from "../util/winston-logger.mjs";

dotenv.config();

export const redis = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});

redis.on("error", (err) => dbLogger.error("redis connect error:", err));

async function connectRedis() {
  await redis.connect();
  dbLogger.info("redis connected");
}

connectRedis();
