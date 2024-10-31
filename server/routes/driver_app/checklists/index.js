import express from "express";
import getChecklists from "../../../controllers/driver_app/get_checklist.js";
import createChecklist from "../../../controllers/driver_app/create_checklist.js";
import { limiter } from "../../../middleware/rateLimiter.js";

const router = express.Router();
router.get("/", getChecklists);
router.post("/", limiter, createChecklist);

export { router };
