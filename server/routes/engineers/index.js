import express from "express";
import getEngineers from "../../controllers/engineers/index.js";
const router = express.Router();
router.get("/", getEngineers);
export { router };
