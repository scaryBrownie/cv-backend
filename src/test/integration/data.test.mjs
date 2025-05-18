import { app } from "../../server.mjs";
import request from "supertest";
import { decryptData } from "../../util/hash.mjs";

describe("Data Api Integration Tests", () => {
  const api_key = process.env.API_KEY;

  describe("Get /data/get-skills", () => {
    it("should return 401", async () => {
      const response = await request(app).get("/data/get-skills");
      expect(response.status).toBe(401);
    });

    it("should return skills with api key", async () => {
      const response = await request(app)
        .get("/data/get-skills")
        .set("x-api-key", api_key);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("success", true);

      const decryptedData = JSON.parse(decryptData(response.body.data));
      expect(Array.isArray(decryptedData.skills)).toBe(true);
    });

    it("should handle pagination", async () => {
      const response = await request(app)
        .get("/data/get-skills?page=1")
        .set("x-api-key", api_key);
      expect(response.status).toBe(200);
      const decryptedData = JSON.parse(decryptData(response.body.data));
      expect(decryptedData).toHaveProperty("hasMore");
    });
  });

  describe("GET /data/get-education", () => {
    it("should return education data", async () => {
      const response = await request(app)
        .get("/data/get-education")
        .set("x-api-key", api_key);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("success", true);

      const decryptedData = JSON.parse(decryptData(response.body.data));
      expect(Array.isArray(decryptedData.education)).toBe(true);
    });
  });

  describe("GET /data/get-work", () => {
    it("should return work experience data", async () => {
      const response = await request(app)
        .get("/data/get-work")
        .set("x-api-key", api_key);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("success", true);

      const decryptedData = JSON.parse(decryptData(response.body.data));
      expect(Array.isArray(decryptedData.work)).toBe(true);
    });
  });

  describe("GET /data/get-projects", () => {
    it("should return projects with pagination", async () => {
      const response = await request(app)
        .get("/data/get-projects?page=1")
        .set("x-api-key", api_key);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("success", true);

      const decryptedData = JSON.parse(decryptData(response.body.data));
      expect(Array.isArray(decryptedData.projects)).toBe(true);
      expect(decryptedData).toHaveProperty("hasMore");
    });
  });
});
