import express from "express";

import { limiter } from "../middleware/rateLimiter.js";

import testEmail from "./controller.js";
const router = express.Router();

router.post("/dev", limiter, testEmail);

export { router };
