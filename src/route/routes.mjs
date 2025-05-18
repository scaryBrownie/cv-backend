import express from "express";
import { dataRouter } from "./data-routes.mjs";

const router = express.Router();

router.use("/data", dataRouter);

export default router;
