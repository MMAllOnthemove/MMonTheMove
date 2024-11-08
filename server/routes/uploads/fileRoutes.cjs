const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../../controllers/uploads/add_upload.cjs");

const upload = multer({
    dest: "./uploads/",
    storage: multer.diskStorage({
        destination: "./uploads/",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
module.exports = { router };
