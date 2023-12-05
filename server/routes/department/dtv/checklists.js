const express = require("express");
const router = express.Router();

const {
  createChecklist,
} = require("../../../controllers/department/dtv/checklists/create_checklist");
const {
  getChecklists,
} = require("../../../controllers/department/dtv/checklists/get_checklist");

router.post("/create", createChecklist);
router.get("/get", getChecklists);

module.exports = router;
