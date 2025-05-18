import {
  getSkills,
  getEducation,
  getWork,
  getProjects,
} from "../controller/data-controller.mjs";
import express from "express";

export const dataRouter = express.Router();

dataRouter.get("/get-skills", getSkills);
dataRouter.get("/get-education", getEducation);
dataRouter.get("/get-work", getWork);
dataRouter.get("/get-projects", getProjects);
