import express from "express";
import addDrivers from "../../../controllers/driver_app/create_driver.js";
import getDrivers from "../../../controllers/driver_app/get_drivers.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateAdmin } from "../../../middleware/verify_admin.js";
import { authenticateToken } from "../../../middleware/verify.js";
import { authenticateRole } from "../../../middleware/verify_role.js";
const router = express.Router();
router.get("/", authenticateToken, getDrivers);
router.post("/", limiter, authenticateRole(["admin", "manager"]), addDrivers);

export { router };
