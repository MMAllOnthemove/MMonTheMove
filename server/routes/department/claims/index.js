import express from "express";
import CreateClaim from "../../../controllers/department/claims/create_claim.js";
import getClaims from "../../../controllers/department/claims/get_claims.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateToken } from "../../../middleware/verify.js";

const router = express.Router();
router.get("/", authenticateToken, getClaims);
router.post("/", limiter, authenticateToken, CreateClaim);
export { router };
