import express from "express";
import addComment from "../../controllers/comments/add_comments.js";
import { limiter } from "../../middleware/rateLimiter.js";
import getComments from "../../controllers/comments/get_comments.js";
import { authenticateToken } from "../../middleware/verify.js";

const router = express.Router();
// todo: uncomment
// router.post("/", limiter, authenticateToken, addComment);
router.post("/", authenticateToken, addComment);
router.get("/", authenticateToken, getComments);
export { router };
