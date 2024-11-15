import express from "express";
import createChecklist from "../../../controllers/driver_app/create_checklist.js";
import getChecklists from "../../../controllers/driver_app/get_checklist.js";
import updateChecklist from "../../../controllers/driver_app/update_checklist.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateToken } from "../../../middleware/verify.js";

const router = express.Router();
router.get("/", authenticateToken, getChecklists);
router.post("/", limiter, authenticateToken, createChecklist);
router.put("/:id", limiter, authenticateToken, updateChecklist);

export { router };

