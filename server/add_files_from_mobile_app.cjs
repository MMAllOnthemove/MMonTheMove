const SftpClient = require("ssh2-sftp-client");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");
const yup = require("yup");
require("dotenv").config();
const moment = require("moment");
const multer = require("multer");
const sharp = require("sharp");

// Database connection
const pool = new Pool({
    user: process.env.NEXT_PUBLIC_DB_USER,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: process.env.NEXT_PUBLIC_DB_PORT,
});

// SFTP Configuration
const sftpConfig = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
};

// File upload validation schema
const fileUploadSchema = yup.object().shape({
    files: yup
        .array()
        .required("Files are required")
        .max(15, "Maximum 15 files allowed")
        .of(
            yup.mixed().test("fileSize", "File size exceeds 15MB", (value) => {
                return value.size <= 15 * 1024 * 1024;
            })
        ),
});
// this will apply to dtv who want to upload to repairshopr
const addFilesFromMobileApp = async (req, res) => {
    const sftpClient = new SftpClient();
    try {
        const { task_id, ticket_number, created_at } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        await fileUploadSchema.validate({ files: req.files });

        if (!sftpClient.sftp) {
            console.log("Connecting to SFTP...");
            await sftpClient.connect(sftpConfig);
            console.log("SFTP Connection Established");
        }

        const fileUrls = await Promise.all(
            req.files.map(async (file, index) => {
                if (!file || !file.buffer) {
                    console.error("Invalid file:", file);
                    return null;
                }
                // web: file.originalName
                // mobile: file.originalnrsame
                const rawFileName = file.originalname || file.originalName;
                const sanitizedFileName = rawFileName.replace(
                    /[^a-zA-Z0-9.-]/g,
                    "_"
                );

                const remotePath = `/var/www/uploads/dtv_ha/${sanitizedFileName}`;

                try {
                    // complress image before uploading
                    let fileBufferToUpload = file.buffer;
                    // do not compress pdf files
                    if (!sanitizedFileName.endsWith(".pdf")) {
                        const image = sharp(file.buffer);
                        const metadata = await image.metadata();
                        // accomodate png files and let them keep their extension
                        if (metadata.format === "png") {
                            fileBufferToUpload = await image
                                .png({ quality: 80, compressionLevel: 8 })
                                .toBuffer();
                        } else if (metadata.format === "webp") {
                            fileBufferToUpload = await image
                                .webp({ quality: 80 })
                                .toBuffer();
                        } else {
                            fileBufferToUpload = await image
                                .jpeg({ quality: 80 })
                                .toBuffer();
                        }
                    }
                    await sftpClient.put(fileBufferToUpload, remotePath);
                    console.log("remote path", remotePath);
                    const fileUrl = `https://repair.mmallonthemove.co.za/files/dtv_ha/${sanitizedFileName}`;
                    console.log("fileUrl", fileUrl);
                    return fileUrl;
                } catch (uploadError) {
                    console.error("Error uploading file:", uploadError);
                    return null;
                }
            })
        );

        return res.status(201).json({
            message: "Files uploaded",
            fileUrls: fileUrls.filter(Boolean),
        });
    } catch (err) {
        if (err instanceof multer.MulterError) {
            return res
                .status(400)
                .json({ message: `Multer error: ${err.message}` });
        }
        if (err instanceof yup.ValidationError) {
            return res
                .status(400)
                .json({ message: "Please check your files and try again" });
        }
        return res.status(500).json({ message: "Failed to upload, try again" });
    } finally {
        sftpClient.end();
    }
};

module.exports = { addFilesFromMobileApp };
