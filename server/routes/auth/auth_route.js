import express from "express";
import LoginUser from "../../controllers/auth/login.js";
import SignupUser from "../../controllers/auth/signup.js";
import ForgotPassword from "../../controllers/auth/forgot_password.js";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import { RefreshToken } from "../../refreshTokens/index.js";
const router = express.Router();

import LogoutUser from "../../controllers/auth/logout.js";

import AdminRoute from "../../controllers/protected/admin.js";
import ProtectedRoute from "../../controllers/protected/index.js";
import CurrentUser from "../../controllers/protected/user.js";

router.post("/signup", limiter, SignupUser);
router.post("/login", limiter, LoginUser);
router.post("/forgot_password", limiter, ForgotPassword);
router.post("/token", RefreshToken);
router.get("/protected", authenticateToken, ProtectedRoute);
router.get("/user/me", authenticateToken, CurrentUser);
router.get("/user/admin", authenticateAdmin, AdminRoute);

router.get("/logout", LogoutUser);

export { router };
