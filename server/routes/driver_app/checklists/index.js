import express from "express";
import getChecklists from "../../../controllers/driver_app/get_checklist.js";
import createChecklist from "../../../controllers/driver_app/create_checklist.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateAdmin } from "../../../middleware/verify_admin.js";
import { authenticateToken } from "../../../middleware/verify.js";

const router = express.Router();
router.get("/", authenticateToken, getChecklists);
router.post("/", limiter, authenticateAdmin, createChecklist);

export { router };