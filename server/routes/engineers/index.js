import express from "express";
import getEngineers from "../../controllers/engineers/get_engineers.js";
import addEngineers from "../../controllers/engineers/add_engineers.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import { authenticateToken } from "../../middleware/verify.js";
import deleteEngineers from "../../controllers/engineers/delete_engineers.js";
import { limiter } from "../../middleware/rateLimiter.js";
import { updateEngineer } from "../../controllers/engineers/update_engineer.js";
import { authenticateRole } from "../../middleware/verify_role.js";
const router = express.Router();
router.get("/", authenticateToken, getEngineers);
router.post("/", limiter, authenticateRole(["admin", "manager"]), addEngineers);
router.delete("/:id", authenticateRole(["manager"]), deleteEngineers);
router.patch("/:id", authenticateRole(["admin", "manager"]), updateEngineer);

export { router };
