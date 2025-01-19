import express from "express";

import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import AddCheckListImagesDeveloper from "../../controllers/tools/add_checklist_images.js";

import { authenticateToken } from "../../middleware/verify.js";
const router = express.Router();

router.post("/", limiter, authenticateToken, AddCheckListImagesDeveloper);


export { router };
