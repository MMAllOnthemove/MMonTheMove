import express from "express";
import addStore from "../../controllers/stores/add_store.js";
import getStores from "../../controllers/stores/get_stores.js";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import { authenticateRole } from "../../middleware/verify_role.js";
import deleteStore from "../../controllers/stores/delete_store.js";
import { authenticateToken } from "../../middleware/verify.js";
const router = express.Router();
router.get("/", authenticateToken, getStores);
router.post("/", limiter, authenticateToken, addStore);
router.delete("/:id", authenticateRole(["manager"]), deleteStore);

export { router };
