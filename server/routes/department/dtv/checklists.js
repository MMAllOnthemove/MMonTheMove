import express from "express";
const router = express.Router();

import CreateChecklist from "../../../controllers/department/dtv/checklists/create_checklist.js";
import GetChecklists from "../../../controllers/department/dtv/checklists/get_checklist.js";

router.post("/create", CreateChecklist);
router.get("/get", GetChecklists);

export { router };
