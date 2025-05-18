import dotenv from "dotenv";
import { connectDB } from "../../database/connect-database.mjs";
import { redis } from "../../database/redis.mjs";
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await redis.quit();
});
