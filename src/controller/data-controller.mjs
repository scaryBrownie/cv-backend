import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../util/response-handler.mjs";
import { systemLogger } from "../util/winston-logger.mjs";
import Skill from "../model/skill.mjs";
import Education from "../model/education.mjs";
import Work from "../model/work.mjs";
import Project from "../model/project.mjs";
import { encryptData } from "../util/hash.mjs";
import { redis } from "../database/redis.mjs";

/**
 * @openapi
 * /data/get-skills:
 *   get:
 *     summary: Get all skills
 *     tags:
 *       - data
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 *                 hasMore:
 *                   type: boolean
 */

export const getSkills = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 15;
    const skip = (page - 1) * limit;
    const cachedKey = `skills:${page}`;

    const cachedSkills = await redis.get(cachedKey);
    if (cachedSkills) {
      sendSuccessResponse(res, 200, null, cachedSkills);
      return;
    }
    const skills = await Skill.find().skip(skip).limit(limit);
    const total = await Skill.countDocuments();
    const hasMore = skills.length + skip < total;
    const encrypted = encryptData(JSON.stringify({ skills, hasMore }));

    await redis.set(cachedKey, encrypted, "EX", 3600);
    sendSuccessResponse(res, 200, null, encrypted);
  } catch (error) {
    systemLogger.error("Something wrong getting skills " + error);
    sendErrorResponse(res, 500, "Something went wrong.");
  }
};

/**
 * @openapi
 * /data/get-education:
 *   get:
 *     summary: Get all education
 *     tags:
 *       - data
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 education:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Education'
 */

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    const encrypted = encryptData(JSON.stringify({ education }));
    sendSuccessResponse(res, 200, null, encrypted);
  } catch (error) {
    systemLogger.error("Something wrong getting education " + error);
    sendErrorResponse(res, 500, "Something went wrong.");
  }
};

/**
 * @openapi
 * /data/get-work:
 *   get:
 *     summary: Get all work
 *     tags:
 *       - data
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 work:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Work'
 */

export const getWork = async (req, res) => {
  try {
    const work = await Work.find();
    const encrypted = encryptData(JSON.stringify({ work }));
    sendSuccessResponse(res, 200, null, encrypted);
  } catch (error) {
    systemLogger.error("Something wrong getting work " + error);
    sendErrorResponse(res, 500, "Something went wrong.");
  }
};

/**
 * @openapi
 * /data/get-projects:
 *   get:
 *     summary: Get all projects
 *     tags:
 *       - data
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 hasMore:
 *                   type: boolean
 */

export const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const projects = await Project.find().skip(skip).limit(limit);
    const total = await Project.countDocuments();
    const hasMore = skip + projects.length < total;
    const encrypted = encryptData(JSON.stringify({ projects, hasMore }));
    sendSuccessResponse(res, 200, null, encrypted);
  } catch (error) {
    systemLogger.error("Something wrong getting projects " + error);
    sendErrorResponse(res, 500, "Something went wrong.");
  }
};
