import { login, dummyFunc } from "../controller/auth-controller.mjs";
import { authenticate } from "../middleware/authenticate.mjs";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.get("/dummy", authenticate, dummyFunc);
