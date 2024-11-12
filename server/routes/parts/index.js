import express from "express";

import { limiter } from "../../middleware/rateLimiter.js";

import AddPart from "../../controllers/department/parts/add_part.js";
import { authenticateToken } from "../../middleware/verify.js";
const router = express.Router();

router.post("/", limiter, authenticateToken, AddPart);

export { router };
