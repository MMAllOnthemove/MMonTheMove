import express from "express";
const router = express.Router();

import DeleteJob from "../../../controllers/department/parts/delete_jobs.js";
import {
  GetPartsJobs,
  GetJobById,
} from "../../../controllers/department/parts/get_jobs.js";
import PostPartsJob from "../../../controllers/department/parts/post_jobs.js";
import UpdateJobById from "../../../controllers/department/parts/update_jobs.js";

router.get("/get", GetPartsJobs);
router.get("/get/:id", GetJobById);
router.post("/post", PostPartsJob);
router.put("/put/:id", UpdateJobById);
router.delete("/delete/:id", DeleteJob);

export { router };
