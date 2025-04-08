import express from "express";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";
import addAttachments from "./add_ticket_images.js";
const router = express.Router();


router.post("/", limiter, authenticateToken, addAttachments);


export { router };

