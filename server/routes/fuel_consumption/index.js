import express from "express";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";

import addFuelUsage from "../../controllers/fuel_consumption/add_fuel_usage.js";
import getFuelUsage from "../../controllers/fuel_consumption/get_fuel_usage.js";
import getSingleCarFuelUsage from "../../controllers/fuel_consumption/get_single_car_fuel_usage.js";
const router = express.Router();

router.get("/", authenticateToken, getFuelUsage);
router.get("/:id", authenticateToken, getSingleCarFuelUsage);
router.post("/", limiter, authenticateToken, addFuelUsage);

export { router };
