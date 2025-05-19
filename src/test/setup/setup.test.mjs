const dotenv = require("dotenv");
const { connectDB } = require("../../database/connect-database.mjs");
const { redis } = require("../../database/redis.mjs");
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await redis.quit();
});

it("db connection", () => {
  expect(true).toBe(true);
});
