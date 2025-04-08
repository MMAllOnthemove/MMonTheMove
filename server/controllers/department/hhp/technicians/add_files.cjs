<<<<<<< HEAD
const sftp = require("ssh2-sftp-client");
const path = require("path");
const fs = require("fs");
const pg = require("pg");
const yup = require("yup");

const moment = require("moment");

// create a connection to db as we cannot import a module in a common js file

const pool = new pg.Pool({
=======
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
>>>>>>> origin/sockets-realtime
    user: process.env.NEXT_PUBLIC_DB_USER,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: process.env.NEXT_PUBLIC_DB_PORT,
});

<<<<<<< HEAD
const sftpConfig = {
    host: `${process.env.SFTP_HOST}`,
    port: process.env.SFTP_PORT,
    username: `${process.env.SFTP_USERNAME}`,
    password: `${process.env.SFTP_PASSWORD}`,
};

=======
// SFTP Configuration
const sftpConfig = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
};

// File upload validation schema
>>>>>>> origin/sockets-realtime
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
<<<<<<< HEAD
const sftpClient = new sftp();

const datetimestamp = new Date(
    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

// Format date to remove special characters for filenames
const date = moment(datetimestamp).format("YYYY-MM-DD%HH:mm:ss");
=======

const sftpClient = new SftpClient();
>>>>>>> origin/sockets-realtime

const uploadTechnicianFiles = async (req, res) => {
    try {
        const { task_id, ticket_number, created_at } = req.body;
<<<<<<< HEAD
        // Check if files are present in the request
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        // const { files } = req.files;
        // Validate files using Yup schema
        await fileUploadSchema.validate({ files: req.files });

        // connect to server
        await sftpClient.connect(sftpConfig);

        // Upload all files and remove local temporary files afterward
        const fileUrls = await Promise.all(
            req.files.map(async (file, index) => {
                // Sanitize filename and add a unique identifier
                const sanitizedFileName = file.originalname
                    .replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special characters with _
                    .toLowerCase();
                const uniqueFileName = `${ticket_number}-hhp-${
                    index + 1
                }-${sanitizedFileName}`;

                const remotePath = `/home/mmallonthemove/uploads/hhp/${uniqueFileName}`;

                try {
                    // Upload the file to SFTP
                    await sftpClient.put(file.path, remotePath);

                    // Remove the temporary file from local storage
                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.error(
                                "Error deleting file:",
                                file.path,
                                err
                            );
                        }
                    });
                    // the file being added
                    const fileBeingAdded = `https://repair.mmallonthemove.co.za/files/hhp/${uniqueFileName}`;
                    // add the file url of this task into our db
                    await pool.query(
                        "INSERT INTO technician_tasks_images (task_id, image_url, created_at) values ($1, $2, $3)",
                        [task_id, fileBeingAdded, created_at]
                    );
                    // Construct and return the file URL
                    return `https://repair.mmallonthemove.co.za/files/hhp/${uniqueFileName}`;
                } catch (uploadError) {
                    console.error("Error uploading file:", uploadError);
                    // throw new Error(
                    //     `Failed to upload file: ${file.originalname}`
                    // );
=======
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        await fileUploadSchema.validate({ files: req.files });

        if (!sftpClient.sftp) {
            // console.log("Connecting to SFTP...");
            await sftpClient.connect(sftpConfig);
            // console.log("SFTP Connection Established");
        }

        const fileUrls = await Promise.all(
            req.files.map(async (file, index) => {
                if (!file || !file.buffer) {
                    console.error("Invalid file:", file);
                    return null;
                }
                // web: file.originalName
                // mobile: file.originalnrsame
                console.log("file", file);
                const rawFileName =
                    file.originalname ||
                    file.originalName
                        .replace(/[^a-zA-Z0-9.-]/g, "_")
                        .toLowerCase();
                const sanitizedFileName = rawFileName
                    .replace(/[^a-zA-Z0-9.-]/g, "_")
                    .toLowerCase();
                // const sanitizedFileName = file.originalname
                // .replace(/[^a-zA-Z0-9.-]/g, "_")
                // .toLowerCase();
                const uniqueFileName = `${ticket_number}-hhp-${
                    index + 1
                }-${sanitizedFileName}`;
                const remotePath = `/var/www/uploads/hhp/${uniqueFileName}`;

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
                    const fileUrl = `https://repair.mmallonthemove.co.za/files/hhp/${uniqueFileName}`;
                    await pool.query(
                        "INSERT INTO technician_tasks_images (task_id, image_url, created_at) VALUES ($1, $2, $3)",
                        [task_id, fileUrl, created_at]
                    );
                    return fileUrl;
                } catch (uploadError) {
                    console.error("Error uploading file:", uploadError);
                    return null;
>>>>>>> origin/sockets-realtime
                }
            })
        );

<<<<<<< HEAD
        return res
            .status(201)
            .json({ message: "Files uploaded", fileUrls: fileUrls });
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({
                message: "Please check your files and try again",
            });
        } else {
            return res
                .status(500)
                .json({ message: "Failed to upload, try again" });
        }
=======
        return res.status(201).json({
            message: "Files uploaded",
            fileUrls: fileUrls.filter(Boolean),
        });
    } catch (err) {
        console.log("err", err);
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
>>>>>>> origin/sockets-realtime
    } finally {
        sftpClient.end();
    }
};

module.exports = { uploadTechnicianFiles };
