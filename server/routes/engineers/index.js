import express from "express";
import getEngineers from "../../controllers/engineers/get_engineers.js";
import addEngineers from "../../controllers/engineers/add_engineers.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import { authenticateToken } from "../../middleware/verify.js";
import deleteEngineers from "../../controllers/engineers/delete_engineers.js";
import { limiter } from "../../middleware/rateLimiter.js";


const router = express.Router();
router.get("/", authenticateAdmin, getEngineers);
router.post("/", limiter, authenticateAdmin, addEngineers);
router.delete("/:id", authenticateAdmin, deleteEngineers);

export { router };
