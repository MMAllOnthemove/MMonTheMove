const express = require("express");
const multer = require("multer");

const {
    addFilesFromMobileApp,
} = require("../../add_files_from_mobile_app.cjs");

const rateLimit = require("express-rate-limit");

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
});

// Allowed file types
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/avi",
    "video/mov",
    "application/pdf",
];


// Multer file filter
const fileFilter = (req, file, cb) => {
    ALLOWED_MIME_TYPES.includes(file.mimetype)
        ? cb(null, true)
        : cb(
              new Error(
                  "Invalid file type. Only images, videos, and PDFs are allowed."
              ),
              false
          );
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
});
const router = express.Router();

router.post(
    "/mobile",
    upload.array("files", 15),
    limiter,
    addFilesFromMobileApp
);

// router.post("/", upload.single("file"), limiter, uploadFile);
module.exports = { router };
