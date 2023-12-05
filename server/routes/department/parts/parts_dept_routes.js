const express = require("express");
const router = express.Router();

const {
  deleteJob,
} = require("../../../controllers/department/parts/delete_jobs");
const {
  getPartsJobs,
  getJobById,
} = require("../../../controllers/department/parts/get_jobs");
const {
  postPartsJob,
} = require("../../../controllers/department/parts/post_jobs");
const {
  updateJobById,
} = require("../../../controllers/department/parts/update_jobs");

router.get("/get", getPartsJobs);
router.get("/get/:id", getJobById);
router.post("/post", postPartsJob);
router.put("/put/:id", updateJobById);
router.delete("/delete/:id", deleteJob);

module.exports = router;
