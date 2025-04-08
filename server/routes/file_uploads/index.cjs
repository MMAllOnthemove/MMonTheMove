const express = require("express");
const multer = require("multer");
const rateLimit = require("express-rate-limit");

const {
    uploadTechnicianFiles,
} = require("../../controllers/department/hhp/technicians/add_files.cjs");
const { uploadQCFile } = require("../../controllers/qc_uploads/add_qc.cjs");
const {
    uploadChecklistFiles,
} = require("../../controllers/driver_app/add_files.cjs");
const {
    uploadTicketAttachments,
} = require("../../controllers/tickets_attachments/add_files.cjs");

const router = express.Router();

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

// Multer upload config (using memoryStorage if direct SFTP upload)
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
});
// Routes for file uploads
router.post("/", upload.array("files", 15), limiter, uploadTechnicianFiles);
router.post("/qc", upload.array("files", 15), limiter, uploadQCFile);
router.post(
    "/checklists",
    upload.array("files", 15),
    limiter,
    uploadChecklistFiles
);
router.post(
    "/ticket_attachments",
    upload.array("files", 15),
    limiter,
    uploadTicketAttachments
);
module.exports = { router };
