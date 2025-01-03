import express from "express";
import addComment from "../../controllers/comments/add_comments.js";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";

const router = express.Router();
router.post("/", limiter, authenticateToken, addComment);
export { router };
