const sftp = require("ssh2-sftp-client");
const path = require("path");
const fs = require("fs");
const yup = require("yup");
const pg = require("pg");
const moment = require("moment");
<<<<<<< HEAD

=======
require("dotenv").config();
>>>>>>> origin/sockets-realtime
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
const date = moment(datetimestamp).format("YYYY-MM-DD");

const uploadChecklistFiles = async (req, res) => {
    try {
        const { car, vehicle_checklist_id, created_at } = req.body;
        // Check if files are present in the request
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        // Validate files using Yup schema
        await fileUploadSchema.validate({ files: req.files });
        // connect to server
        await sftpClient.connect(sftpConfig);

        // Upload all files and remove local temporary files afterward
        const fileUrls = await Promise.all(
            req.files.map(async (file, index) => {
                // Because we have 'files' as a directory pointing to '/uploads' folder in our root
                // we will only reference it as 'files'
                // e.g. we have a directory inside 'files' called 'driver_app_checklists'
                // we will now reference it as https://url.com/files/driver_app_checklists/filename
                const sanitizedFileName = file.originalname
<<<<<<< HEAD
                    .replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special characters with _
                    .toLowerCase();
=======
                    ?.replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special characters with _
                    ?.toLowerCase();
>>>>>>> origin/sockets-realtime
                const uniqueFileName = `${car}-${date}-${
                    index + 1
                }-${sanitizedFileName}`;

<<<<<<< HEAD
                const remotePath = `/home/mmallonthemove/uploads/driver_app_checklists/${uniqueFileName}`;
=======
                const remotePath = `/var/www/uploads/driver_app_checklists/${uniqueFileName}`;
>>>>>>> origin/sockets-realtime
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
                    const fileBeingAdded = `https://repair.mmallonthemove.co.za/files/driver_app_checklists/${uniqueFileName}`;

                    // add the file url of this car into our db
                    await pool.query(
                        "INSERT INTO vehicle_checklist_images (vehicle_checklist_id, image_url, created_at) values ($1, $2, $3)",
                        [vehicle_checklist_id, fileBeingAdded, created_at]
                    );
                    // Construct and return the file URL
                    return `https://repair.mmallonthemove.co.za/files/driver_app_checklists/${uniqueFileName}`;
                } catch (uploadError) {
                    if (process.env.NODE_ENV !== "production")
                        console.error("Error uploading file:", uploadError);
<<<<<<< HEAD
=======
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
>>>>>>> origin/sockets-realtime
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
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({
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

module.exports = { uploadChecklistFiles };
