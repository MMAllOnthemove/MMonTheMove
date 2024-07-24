import express from "express";
import getEngineers from "../../controllers/engineers/index.js";
import addEngineers from "../../controllers/engineers/add_engineers.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import deleteEngineers from "../../controllers/engineers/delete_engineers.js";

const router = express.Router();
router.get("/", getEngineers);
router.post("/", authenticateAdmin, addEngineers);
router.delete("/:id", authenticateAdmin, deleteEngineers);

export { router };
