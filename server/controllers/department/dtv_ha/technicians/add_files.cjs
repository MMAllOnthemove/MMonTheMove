const sftp = require("ssh2-sftp-client");
const path = require("path");
const fs = require("fs");
const yup = require("yup");

const moment = require("moment");

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

const uploadDTVHAFiles = async (req, res) => {
    try {
        const { ticket_number } = req.body;
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
            req.files.map(async (file) => {
                const remotePath = `/root/uploads/dtv_ha/${ticket_number}-dtv_ha-${file.originalname}`;

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

                    // Construct and return the file URL
                    return `https://repair.mmallonthemove.co.za/files/dtv_ha/${ticket_number}-dtv_ha-${file.originalname}`;
                } catch (uploadError) {
                    console.error("Error uploading file:", uploadError);
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

module.exports = { uploadDTVHAFiles };