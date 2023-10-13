const express = require("express");
const router = express.Router();

const {
  postPartsJob,
  getPartsJobs,
  getJobById,
  updateJobById,
  deleteJob,
} = require("../controllers/parts_dept");

router.get("/get", getPartsJobs);
router.get("/get/:id", getJobById);
router.post("/post", postPartsJob);
router.put("/put/:id", updateJobById);
router.delete("/delete/:id", deleteJob);

module.exports = router;
