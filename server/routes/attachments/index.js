import express from "express";
import { authenticateToken } from "../../middleware/verify.js";
import getAttachments from "../../controllers/attachments/get_attachments.js";

const router = express.Router();
router.get("/", authenticateToken, getAttachments);
export { router };
