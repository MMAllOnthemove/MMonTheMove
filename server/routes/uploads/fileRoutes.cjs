const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../../controllers/uploads/add_upload.cjs");
const { uploadQCFile } = require("../../controllers/qc_uploads/add_qc.cjs");

const upload = multer({
    dest: "./uploads/",
    storage: multer.diskStorage({
        destination: "./uploads/",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});
const router = express.Router();

// 'files' because we are uploading one or more files
router.post("/qc", upload.array("files", 15), uploadQCFile);
router.post("/", upload.single("file"), uploadFile);
module.exports = { router };
