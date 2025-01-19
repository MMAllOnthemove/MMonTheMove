const express = require("express");
const multer = require("multer");

const {
    uploadDTVHAFiles,
} = require("../../controllers/department/dtv_ha/technicians/add_files.cjs");

const rateLimit = require("express-rate-limit");
// File filter to allow images, videos, and PDFs
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/avi",
        "video/mov",
        "application/pdf", // Add PDF MIME type
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(
            new Error(
                "Invalid file type. Only images, videos, and PDFs are allowed."
            ),
            false
        ); // Reject the file
    }
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const upload = multer({
    dest: "./uploads/",
    fileFilter,
    storage: multer.diskStorage({
        destination: "./uploads/",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});
const router = express.Router();

router.post(
    "/ticket_attachments",
    upload.array("files", 15),
    limiter,
    uploadDTVHAFiles
);

// router.post("/", upload.single("file"), limiter, uploadFile);
module.exports = { router };
