import express from "express";

import { limiter } from "../../middleware/rateLimiter.js";

import AddPart from "../../controllers/department/parts/add_part.js";
import { authenticateToken } from "../../middleware/verify.js";
import GetPartsForTask from "../../controllers/department/parts/get_parts.js";
import deletePart from "../../controllers/department/parts/delete_part.js";
const router = express.Router();

router.post("/", limiter, authenticateToken, AddPart);
router.get("/:id", limiter, authenticateToken, GetPartsForTask);
router.delete("/:id", limiter, authenticateToken, deletePart);

export { router };
