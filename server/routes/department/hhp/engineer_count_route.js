import express from "express";
const router = express.Router();

import GetEngineerHeadCount from "../../../controllers/department/hhp/engineer_count.js";

router.get("/count", GetEngineerHeadCount);
export { router };
