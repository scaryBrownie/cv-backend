const request = require("supertest");
const { app } = require("../../server.mjs");

describe("Security Tests", () => {
  it("should have security headers", async () => {
    const response = await request(app)
      .get("/data/get-skills")
      .set("x-api-key", process.env.API_KEY);

    expect(response.headers).toHaveProperty("x-content-type-options");
    expect(response.headers).toHaveProperty("x-frame-options");
    expect(response.headers).toHaveProperty("x-xss-protection");
  });
});
