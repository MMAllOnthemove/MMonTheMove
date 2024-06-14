import express from "express";
import getAgents from "../../controllers/agents/index.js";

const router = express.Router();
router.get("/", getAgents);
export { router };
