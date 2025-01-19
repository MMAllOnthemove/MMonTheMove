import express from "express";
import getDeviceNames from "../../controllers/device_names/get_devices.js";
import { authenticateToken } from "../../middleware/verify.js";

const router = express.Router();
router.get("/", authenticateToken, getDeviceNames);

export { router };
