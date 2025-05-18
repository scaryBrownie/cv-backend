import request from "supertest";
import { app } from "../../server.mjs";

describe("Error handling test", () => {
  it("invalid route", async () => {
    const response = await request(app)
      .get("/random-wrong-route")
      .set("x-api-key", process.env.API_KEY);

    expect(response.status).toBe(404);
  });
});
