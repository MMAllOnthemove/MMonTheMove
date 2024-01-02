import express from "express";
const router = express.Router();

import {
  PostPartsJobHistory,
  GetPartsJobsHistory,
} from "../../controllers/history/parts_dept.js";

router.get("/get", GetPartsJobsHistory);
router.post("/post", PostPartsJobHistory);
export { router };
