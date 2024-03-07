import express from "express";
const router = express.Router();
import { GetTasksForAnalytics } from "../../../controllers/department/dtv/tasks/get_tasks.js";

router.get("/get", GetTasksForAnalytics);

export { router };
