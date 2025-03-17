import express from "express";

import { limiter } from "../../middleware/rateLimiter.js";

import AddPart from "../../controllers/department/parts/add_part.js";
import { authenticateToken } from "../../middleware/verify.js";
import GetPartsForTask from "../../controllers/department/parts/get_parts.js";
import deletePart from "../../controllers/department/parts/delete_part.js";
import { UpdatePart } from "../../controllers/department/parts/update_part.js";
import GetOldParts from "../../controllers/department/parts/get_old_part.js";
const router = express.Router();

router.post("/", limiter, authenticateToken, AddPart);
router.get("/:id", limiter, authenticateToken, GetPartsForTask);
router.get("/old_parts/:id", limiter, authenticateToken, GetOldParts);
router.delete("/:id", limiter, authenticateToken, deletePart);
router.put("/:id", limiter, authenticateToken, UpdatePart);

export { router };
