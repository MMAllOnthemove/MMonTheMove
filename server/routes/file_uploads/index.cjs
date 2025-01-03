const express = require("express");
const multer = require("multer");
// const { uploadFile } = require("../../controllers/uploads/add_upload.cjs");
const { uploadQCFile } = require("../../controllers/qc_uploads/add_qc.cjs");
const {
    uploadTechnicianFiles,
} = require("../../controllers/department/hhp/technicians/add_files.cjs");

const {
    uploadChecklistFiles,
} = require("../../controllers/driver_app/add_files.cjs");
const {
    uploadTicketAttachments,
} = require("../../controllers/tickets_attachments/add_files.cjs");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


// File filter to allow images, videos, and PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif',
    'video/mp4', 'video/avi', 'video/mov',
    'application/pdf' // Add PDF MIME type
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only images, videos, and PDFs are allowed.'), false); // Reject the file
  }
};


const upload = multer({
    dest: "./uploads/",
    fileFilter,
    storage: multer.diskStorage({
        destination: "./uploads/",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});
const router = express.Router();

// 'files' because we are uploading one or more files
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
// router.post("/", upload.single("file"), limiter, uploadFile);
module.exports = { router };
