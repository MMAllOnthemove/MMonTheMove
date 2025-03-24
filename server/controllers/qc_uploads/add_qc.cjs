const sftp = require("ssh2-sftp-client");
const path = require("path");
const fs = require("fs");
const pg = require("pg");
const yup = require("yup");
require("dotenv").config();
const moment = require("moment");

// create a connection to db as we cannot import a module in a common js file

const pool = new pg.Pool({
    user: process.env.NEXT_PUBLIC_DB_USER,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: process.env.NEXT_PUBLIC_DB_PORT,
});

const sftpConfig = {
    host: `${process.env.SFTP_HOST}`,
    port: process.env.SFTP_PORT,
    username: `${process.env.SFTP_USERNAME}`,
    password: `${process.env.SFTP_PASSWORD}`,
};

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
const sftpClient = new sftp();
const datetimestamp = new Date(
    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

// Format date to remove special characters for filenames
const date = moment(datetimestamp).format("YYYY-MM-DD%HH:mm:ss");

const uploadQCFile = async (req, res) => {
    try {
        const { task_id, ticket_number, created_at } = req.body;
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
                const sanitizedFileName = file.originalname
                    ?.replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special characters with _
                    ?.toLowerCase();
                const uniqueFileName = `${ticket_number}-qc-${
                    index + 1
                }-${sanitizedFileName}`;

                const remotePath = `/var/www/uploads/hhp/${uniqueFileName}`;
                console.log("remotePath", remotePath);
                try {
                    await sftpClient.put(file.path, remotePath);
                    // Remove temporary file from local storage
                    fs.unlink(file.path, (err) => {
                        if (err)
                            if (process.env.NODE_ENV !== "production")
                                console.error(
                                    "Error deleting file:",
                                    file.path,
                                    err
                                );
                    });
                    // the file being added
                    const fileBeingAdded = `https://repair.mmallonthemove.co.za/files/hhp/${uniqueFileName}`;
                    // add the file url of this task into our db
                    await pool.query(
                        "INSERT INTO technician_tasks_images (task_id, image_url, created_at) values ($1, $2, $3)",
                        [task_id, fileBeingAdded, created_at]
                    );
                    // Construct URL for uploaded file
                    return `https://repair.mmallonthemove.co.za/files/hhp/${uniqueFileName}`;
                } catch (error) {
                    if (process.env.NODE_ENV !== "production")
                        console.error("Error uploading file:", error);
                    // Remove the temporary file from local storage even on delete
                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.error(
                                "Error deleting file:",
                                file.path,
                                err
                            );
                        }
                    });
                    // throw new Error(
                    //     `Failed to upload file: ${file.originalname}`
                    // );
                }
            })
        );

        return res
            .status(201)
            .json({ message: "Files uploaded", fileUrls: fileUrls });
    } catch (err) {
        console.log("qc upload", err);
        if (err instanceof yup.ValidationError) {
            res.status(400).json({
                message: "Please check your files and try again",
            });
        } else {
            return res
                .status(500)
                .json({ message: "Failed to upload, try again" });
        }
    } finally {
        sftpClient.end();
    }
};

module.exports = { uploadQCFile };
